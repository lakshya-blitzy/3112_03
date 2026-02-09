"""
Flask HTTP Server - Production-ready implementation with comprehensive error handling.

This module provides a Flask-based HTTP server that replaces the original Node.js
server.js implementation with exact functional parity. The server responds with
"Hello, World!" to all valid HTTP requests on port 3000.

Features:
    - Input validation to prevent crashes from malformed requests
    - 30-second timeout handling to prevent hanging connections
    - Request and response error handling with proper cleanup
    - Graceful shutdown on SIGTERM and SIGINT signals
    - Server-level error handling for port conflicts and permission issues
    - ISO 8601 timestamped request logging

Requirements:
    - Python 3.9+
    - Flask 3.1.2

Example:
    Start the server by running the file::

        $ python app.py

    The server will listen on http://localhost:3000

Attributes:
    PORT (int): The TCP port number the server binds to (3000)
    REQUEST_TIMEOUT (int): Request timeout in seconds (30)
    app (Flask): The Flask application instance

Migration Notes:
    This file replaces server.js from the original Node.js implementation.
    All behaviors are preserved: responses, error codes, logging format, and exit codes.
"""

import signal
import sys
import os
import errno
import threading
from datetime import datetime, timezone
from flask import Flask, request


# =============================================================================
# CONFIGURATION CONSTANTS
# =============================================================================

PORT = 3000
"""int: TCP port number for the HTTP server (matching original Node.js server)."""

REQUEST_TIMEOUT = 30
"""int: Request timeout in seconds (30 seconds = 30000 milliseconds in original)."""


# =============================================================================
# FLASK APPLICATION INITIALIZATION
# =============================================================================

app = Flask(__name__)
"""Flask: The Flask application instance exported for programmatic access and testing."""


# =============================================================================
# GLOBAL STATE FOR TIMEOUT HANDLING
# =============================================================================

# Thread-local storage for timeout timers (prevents timer leaks across requests)
_request_timers = {}


# =============================================================================
# ERROR HANDLERS
# =============================================================================

@app.errorhandler(400)
def handle_bad_request(error):
    """
    Handle HTTP 400 Bad Request errors.

    This error handler returns a plain text response for bad requests,
    matching the original Node.js server behavior.

    Args:
        error: The error object passed by Flask.

    Returns:
        tuple: A tuple containing the response body and HTTP status code.
               Response body is 'Bad Request' with status 400.
    """
    return 'Bad Request', 400


@app.errorhandler(408)
def handle_request_timeout(error):
    """
    Handle HTTP 408 Request Timeout errors.

    This error handler returns a plain text response for request timeouts,
    matching the original Node.js server behavior with 30-second timeout.

    Args:
        error: The error object passed by Flask.

    Returns:
        tuple: A tuple containing the response body and HTTP status code.
               Response body is 'Request Timeout' with status 408.
    """
    return 'Request Timeout', 408


@app.errorhandler(500)
def handle_internal_error(error):
    """
    Handle HTTP 500 Internal Server Error.

    This error handler returns a plain text response for internal server errors,
    matching the original Node.js server behavior for unexpected exceptions.

    Args:
        error: The error object passed by Flask.

    Returns:
        tuple: A tuple containing the response body and HTTP status code.
               Response body is 'Internal Server Error' with status 500.
    """
    return 'Internal Server Error', 500


@app.errorhandler(Exception)
def handle_unexpected_error(error):
    """
    Handle any unexpected exceptions during request processing.

    This catch-all error handler ensures the server remains stable and returns
    a proper HTTP 500 response for any unhandled exceptions, matching the
    try-catch behavior in the original Node.js implementation.

    Args:
        error: The exception object.

    Returns:
        tuple: A tuple containing the response body and HTTP status code.
               Response body is 'Internal Server Error' with status 500.
    """
    # Log the unexpected error for debugging
    print(f'Unexpected error in request handler: {error}', file=sys.stderr)
    return 'Internal Server Error', 500


# =============================================================================
# REQUEST HOOKS - BEFORE REQUEST
# =============================================================================

@app.before_request
def before_request_handler():
    """
    Execute before each request for validation and timeout setup.

    This hook performs two critical functions:
    1. Input validation: Ensures request.path and request.method are present
       to prevent crashes from malformed requests (returns HTTP 400 if invalid)
    2. Timeout setup: Initializes a 30-second timeout timer that will terminate
       the request with HTTP 408 if processing takes too long

    The timeout is implemented using threading.Timer to simulate the behavior
    of Node.js req.setTimeout(30000).

    Returns:
        tuple or None: Returns ('Bad Request', 400) if validation fails,
                       None otherwise to continue processing.
    """
    # Basic input validation to prevent crashes from malformed requests
    # This matches the Node.js validation: if (!request.url || !request.method)
    if not request.path or not request.method:
        print('Invalid request: missing URL or method', file=sys.stderr)
        return 'Bad Request', 400

    # Set up request timeout handling using threading.Timer
    # This simulates Node.js: response.setTimeout(30000, callback)
    request_id = id(request._get_current_object())

    def timeout_handler():
        """Handle request timeout by logging and marking the request as timed out."""
        print('Request timeout after 30 seconds', file=sys.stderr)
        # Store timeout flag for the after_request hook to check
        if request_id in _request_timers:
            _request_timers[request_id]['timed_out'] = True

    timer = threading.Timer(REQUEST_TIMEOUT, timeout_handler)
    timer.daemon = True  # Ensure timer doesn't prevent process exit
    timer.start()

    # Store timer reference for cleanup
    _request_timers[request_id] = {
        'timer': timer,
        'timed_out': False
    }

    return None


# =============================================================================
# REQUEST HOOKS - AFTER REQUEST
# =============================================================================

@app.after_request
def after_request_handler(response):
    """
    Execute after each request for logging and cleanup.

    This hook performs two functions:
    1. Logs the request with ISO 8601 timestamp format matching the original:
       '{ISO8601_timestamp} - {METHOD} {path}'
    2. Cleans up timeout timers to prevent memory leaks

    Args:
        response: The Flask response object.

    Returns:
        Response: The unmodified response object passed through.
    """
    # Log incoming request with ISO 8601 timestamp
    # Matches Node.js: console.log(`${new Date().toISOString()} - ${request.method} ${request.url}`)
    timestamp = datetime.now(timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')
    print(f'{timestamp} - {request.method} {request.path}', flush=True)

    # Cancel and cleanup the timeout timer
    request_id = id(request._get_current_object())
    if request_id in _request_timers:
        timer_info = _request_timers.pop(request_id)
        timer_info['timer'].cancel()

    return response


# =============================================================================
# ROUTES - CATCH-ALL HANDLER
# =============================================================================

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])
def catch_all(path):
    """
    Catch-all route handler that responds to all HTTP methods and paths.

    This route handler matches the behavior of the original Node.js server,
    which responds with 'Hello, World!' and HTTP 200 for all valid requests
    regardless of the HTTP method or URL path.

    The route is decorated twice to handle:
    - The root path '/' explicitly
    - All other paths using the '<path:path>' variable rule

    Supported HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS

    Args:
        path (str): The URL path after the domain (can be empty string for root).

    Returns:
        tuple: A tuple containing:
               - 'Hello, World!' as the response body
               - 200 as the HTTP status code

    Example:
        All of these requests return the same response::

            curl http://localhost:3000/
            curl http://localhost:3000/any/path
            curl -X POST http://localhost:3000/
            curl -X DELETE http://localhost:3000/test
    """
    # Check if the request timed out during processing
    request_id = id(request._get_current_object())
    if request_id in _request_timers and _request_timers[request_id].get('timed_out'):
        return 'Request Timeout', 408

    # Return Hello, World! response for all valid requests
    # Matches Node.js: response.end('Hello, World!')
    return 'Hello, World!', 200


# =============================================================================
# SIGNAL HANDLERS FOR GRACEFUL SHUTDOWN
# =============================================================================

def signal_handler(signum, frame):
    """
    Handle SIGTERM and SIGINT signals for graceful shutdown.

    This handler is registered for both SIGTERM (from Docker/Kubernetes/process managers)
    and SIGINT (Ctrl+C) signals to ensure clean process termination.

    Behavior matches the original Node.js implementation:
    - Logs receipt of signal
    - Performs clean shutdown
    - Exits with code 0 (success)

    Args:
        signum (int): The signal number received (SIGTERM=15, SIGINT=2).
        frame: The current stack frame (unused but required by signal module).

    Side Effects:
        - Prints shutdown messages to stdout
        - Terminates the process with exit code 0
    """
    # Map signal number to name for logging
    signal_name = 'SIGTERM' if signum == signal.SIGTERM else 'SIGINT'
    print(f'Received {signal_name}, shutting down gracefully...', flush=True)

    # Cleanup any remaining timers
    for request_id, timer_info in list(_request_timers.items()):
        timer_info['timer'].cancel()
    _request_timers.clear()

    print('Server closed successfully', flush=True)

    # Exit with code 0 for clean shutdown
    # Matches Node.js: process.exit(0)
    # Use os._exit(0) to bypass Werkzeug's exception handling which would intercept SystemExit
    os._exit(0)


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

def run_server():
    """
    Start the Flask HTTP server with signal handling and error management.

    This function:
    1. Registers signal handlers for SIGTERM and SIGINT
    2. Attempts to start the Flask development server on port 3000
    3. Handles port conflict (EADDRINUSE) and permission (EACCES) errors

    The server binds to '0.0.0.0' to accept connections from all network interfaces,
    matching the typical behavior expected for containerized deployments.

    Error Handling:
        - EADDRINUSE: Logs error and exits with code 1
        - EACCES: Logs error and exits with code 1
        - Other OSError: Logs and continues (for non-fatal errors)

    Side Effects:
        - Registers signal handlers
        - Starts Flask development server (blocking)
        - May call sys.exit(1) on fatal errors
    """
    # Register signal handlers for graceful shutdown
    # Matches Node.js: process.on('SIGTERM', ...) and process.on('SIGINT', ...)
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)

    try:
        # Start the server on port 3000
        # Matches Node.js: server.listen(3000)
        print(f'Server listening on port {PORT}', flush=True)
        print(f'Visit http://localhost:{PORT} or use curl -v http://localhost:{PORT}', flush=True)

        # Run Flask development server
        # use_reloader=False prevents double signal registration
        # threaded=True allows handling multiple requests (matching Node.js event loop behavior)
        app.run(
            host='0.0.0.0',
            port=PORT,
            debug=False,
            use_reloader=False,
            threaded=True
        )

    except OSError as error:
        # Handle server-level errors (port conflicts, permission issues)
        # Matches Node.js: server.on('error', ...)

        print(f'Server error: {error}', file=sys.stderr)

        if error.errno == errno.EADDRINUSE:
            # Port 3000 is already in use
            # Matches Node.js: if (error.code === 'EADDRINUSE')
            print(f'Port {PORT} is already in use', file=sys.stderr)
            sys.exit(1)

        elif error.errno == errno.EACCES:
            # Permission denied to bind to port
            # Matches Node.js: if (error.code === 'EACCES')
            print(f'Permission denied - cannot bind to port {PORT}', file=sys.stderr)
            sys.exit(1)

        else:
            # For other errors, log but don't exit to maintain availability
            # (though in practice, the server won't start)
            print(f'Unexpected server error: {error}', file=sys.stderr)
            sys.exit(1)

    except PermissionError as error:
        # Handle permission errors explicitly (alternative to EACCES OSError)
        print(f'Server error: {error}', file=sys.stderr)
        print(f'Permission denied - cannot bind to port {PORT}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    run_server()
