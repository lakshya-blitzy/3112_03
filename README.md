# Hello World HTTP Server

Created by Blitzy

## Overview

This project provides a robust Python Flask HTTP server implementation with comprehensive error handling, graceful shutdown capabilities, input validation, and timeout management. The server is designed to be production-ready with proper resource cleanup and defensive programming practices.

### Architecture and Design Decisions

The server implementation follows a minimalist philosophy while maintaining production-grade robustness:

**Design Philosophy:**
- **Simplicity**: Single-file implementation with minimal external dependencies (Flask only)
- **Robustness**: Comprehensive error handling at every layer (server, request, response, timeout)
- **Defensive Programming**: Input validation and proper resource cleanup prevent crashes and leaks

**Key Design Choices:**

- **30-Second Timeout** (`app.py`): Prevents resource exhaustion from hanging connections. This duration balances responsiveness with accommodating slower network conditions. Implemented using `threading.Timer` to automatically terminate long-running requests.

- **Graceful Shutdown** (`app.py`): Critical for production deployments, especially in containerized environments (Docker/Kubernetes). SIGTERM and SIGINT handlers ensure clean termination, preventing data loss and connection errors.

- **Input Validation** (`app.py`): Validates `request.path` and `request.method` before processing. This defensive check prevents crashes from malformed or malicious requests, returning HTTP 400 Bad Request for invalid inputs.

- **Multi-Layer Error Handling** (`app.py`): Separate error handlers for bad requests, timeouts, server-level errors, and unexpected exceptions ensure the server never crashes unexpectedly. Each layer handles errors appropriate to its context.

## Installation

### Prerequisites

Before running the server, ensure you have the required software installed:

| Requirement | Version | Purpose |
|------------|---------|---------|
| **Python** | >= 3.9 | Python runtime for executing server code |
| **pip** | >= 21.0 | Python package manager for installing Flask |
| **Operating System** | Any (Linux, macOS, Windows) | Cross-platform compatibility |
| **Available Port** | 3000 (default) | Network port for HTTP server binding |

**Verify Python Installation:**

```bash
python3 --version
```

**Expected output:**
```
Python 3.9.0  # or higher (e.g., 3.10.x, 3.11.x, 3.12.x)
```

If Python is not installed, download it from [python.org](https://www.python.org/downloads/).

**Verify pip Installation:**

```bash
pip --version
```

**Expected output:**
```
pip 21.0 or higher
```

### Quick Start

**1. Obtain the Server Files:**

```bash
# Option A: Clone the repository (if using git)
git clone <repository-url>
cd <repository-name>

# Option B: Download files directly
# Place app.py and requirements.txt in your desired directory
```

**2. Create a Virtual Environment (Recommended):**

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/macOS
# OR
venv\Scripts\activate     # Windows
```

**3. Install Dependencies:**

```bash
pip install -r requirements.txt
```

**4. Start the Server:**

```bash
python app.py
```

**Expected output:**
```
Server listening on port 3000
Visit http://localhost:3000 or use curl -v http://localhost:3000
```

**5. Verify Server is Running:**

```bash
curl http://localhost:3000
```

**Expected output:**
```
Hello, World!
```

### Project Structure

The project follows a minimalist structure:

```
.
├── app.py              # Main Flask HTTP server implementation (~80-100 lines)
├── requirements.txt    # Python dependencies (Flask==3.1.2)
├── README.md           # This documentation file
└── blitzy/             # Documentation governance
    ├── Project Guide.md
    └── Technical Specifications.md
```

**Key Implementation Details:**
- **requirements.txt required**: Contains Flask dependency specification
- **pip install needed**: Install Flask via `pip install -r requirements.txt`
- **Single file deployment**: Copy `app.py` and `requirements.txt` to run anywhere
- **Programmatic usage**: Can be imported for testing

## Server Usage

### Starting the Server

To start the HTTP server, run the following command:

```bash
python app.py
```

The server will start on port 3000 and display a startup message:
```
Server listening on port 3000
Visit http://localhost:3000 or use curl -v http://localhost:3000
```

### Accessing the Server

Once started, the server is accessible at:
- **URL**: `http://localhost:3000`
- **Port**: 3000
- **Response**: Returns "Hello, World!" for all valid requests

## API Reference

The server exposes a single HTTP endpoint that accepts all standard HTTP methods.

### HTTP Endpoint

| Property | Value |
|----------|-------|
| **Endpoint** | `/` (root path) and all sub-paths |
| **Methods** | `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS` (all HTTP methods accepted) |
| **Request Format** | Any (request body is ignored) |
| **Response Format** | `text/plain` |
| **Success Response** | HTTP 200 with "Hello, World!" |

### Request Headers

The server accepts any request headers. Common headers include:

| Header | Example | Description |
|--------|---------|-------------|
| `Host` | `localhost:3000` | Target host (required by HTTP/1.1) |
| `User-Agent` | `curl/7.x.x` | Client identification |
| `Accept` | `*/*` | Acceptable response formats |
| `Content-Type` | `application/json` | Request body format (ignored) |

**Note**: The server does not parse or validate request headers beyond basic HTTP protocol requirements handled by Flask/Werkzeug.

### Response Headers

The server returns the following headers with successful responses:

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `text/html; charset=utf-8` | Response body format |
| `Content-Length` | Response size | Size of response body |
| `Server` | `Werkzeug/x.x.x Python/x.x.x` | Server identification |
| `Date` | Current timestamp | Response generation time |

### Status Codes

| Status Code | Condition | Response Body | Implementation |
|-------------|-----------|---------------|----------------|
| **200 OK** | Valid request | `Hello, World!` | Catch-all route handler |
| **400 Bad Request** | Missing path or method | `Bad Request` | `@app.before_request` validation |
| **408 Request Timeout** | Request exceeds 30 seconds | `Request Timeout` | `threading.Timer` timeout handler |
| **500 Internal Server Error** | Request/response error or unexpected exception | `Internal Server Error` | `@app.errorhandler(Exception)` |

### Error Response Format

All error responses follow the same format:

**HTTP Headers:**
```http
HTTP/1.1 [STATUS_CODE] [STATUS_MESSAGE]
Content-Type: text/html; charset=utf-8
```

**Response Body:**
```
[Error Message]
```

**Example - Bad Request:**
```http
HTTP/1.1 400 Bad Request
Content-Type: text/html; charset=utf-8

Bad Request
```

**Example - Request Timeout:**
```http
HTTP/1.1 408 Request Timeout
Content-Type: text/html; charset=utf-8

Request Timeout
```

### Request Logging

All incoming requests are logged to console with ISO 8601 timestamps:

```
2024-01-01T12:00:00.000Z - GET /
2024-01-01T12:00:05.000Z - POST /api/data
2024-01-01T12:00:10.000Z - PUT /users/123
```

**Log Format**: `[ISO 8601 Timestamp] - [HTTP Method] [Request URL]`

## Testing with curl

### Basic Testing

Test the server using curl with verbose output to see full HTTP details:

```bash
curl -v http://localhost:3000
```

**Expected Response:**
```
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.x.x
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: text/html; charset=utf-8
< Content-Length: 13
< Date: [current date]
< 
Hello, World!
```

### Testing Different HTTP Methods

The server accepts all HTTP methods and returns the same response:

```bash
curl -v -X POST http://localhost:3000
curl -v -X PUT http://localhost:3000
curl -v -X DELETE http://localhost:3000
curl -v -X PATCH http://localhost:3000
```

All methods return HTTP 200 with "Hello, World!" response.

### Testing Different Paths

The server responds to all paths:

```bash
curl http://localhost:3000/
curl http://localhost:3000/test
curl http://localhost:3000/api/v1/users
curl http://localhost:3000/any/path/here
```

All paths return HTTP 200 with "Hello, World!" response.

## Graceful Shutdown

The server implements graceful shutdown handling for production environments:

### SIGTERM Handling (Docker/Kubernetes)

The server responds to SIGTERM signals for clean shutdown:

```bash
kill -TERM [server_pid]
```

**Behavior:**
- Logs: "Received SIGTERM, shutting down gracefully..."
- Cleans up active timeout timers
- Logs: "Server closed successfully"
- Exits with code 0

### SIGINT Handling (Ctrl+C)

The server responds to SIGINT signals for interactive shutdown:

```bash
# Press Ctrl+C while server is running
```

**Behavior:**
- Logs: "Received SIGINT, shutting down gracefully..."  
- Cleans up active timeout timers
- Logs: "Server closed successfully"
- Exits with code 0

## Deployment

This section provides guidance for deploying the HTTP server in production environments.

### Production Considerations

Before deploying to production, consider the following:

- **Port Configuration**: Default port 3000 is defined in `app.py`. For production, modify to use environment variables or configure reverse proxy (nginx, Apache) to forward traffic.
  
- **Process Management**: Use a production WSGI server (gunicorn, uWSGI) for production deployments, not Flask's development server.

- **Monitoring**: The server logs all requests to stdout. Configure log aggregation (CloudWatch, Datadog, ELK stack) for production monitoring.

- **Health Checks**: Implement health check endpoints by adding a dedicated route handler for load balancer health checks.

- **Security**: Run as non-privileged user, use reverse proxy for TLS termination, implement rate limiting at proxy layer.

### Docker Deployment

**Containerize the Server:**

Create a `Dockerfile` in the project root:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Copy requirements first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

EXPOSE 3000

CMD ["python", "app.py"]
```

**Build and Run:**

```bash
# Build Docker image
docker build -t hello-server:latest .

# Run container
docker run -d -p 3000:3000 --name hello-server hello-server:latest

# View logs
docker logs -f hello-server

# Stop gracefully (sends SIGTERM)
docker stop hello-server
```

**Expected startup output:**
```
Server listening on port 3000
Visit http://localhost:3000 or use curl -v http://localhost:3000
```

**Docker Compose (optional):**

```yaml
version: '3.8'
services:
  hello-server:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

Run with: `docker-compose up -d`

### Production WSGI Server Deployment (gunicorn)

gunicorn is a production-grade WSGI HTTP server for Python applications.

**Install gunicorn:**

```bash
pip install gunicorn
```

**Start Server with gunicorn:**

```bash
# Start server with 4 workers
gunicorn -w 4 -b 0.0.0.0:3000 app:app

# View help
gunicorn --help
```

**gunicorn Configuration File:**

Create `gunicorn.conf.py`:

```python
# gunicorn.conf.py
bind = "0.0.0.0:3000"
workers = 4
worker_class = "sync"
timeout = 30
keepalive = 5
errorlog = "-"
accesslog = "-"
loglevel = "info"
```

**Start with Configuration:**

```bash
gunicorn -c gunicorn.conf.py app:app
```

### Systemd Service Deployment

For Linux systems using systemd, create a service unit file.

**Create Service File:**

Create `/etc/systemd/system/hello-server.service`:

```ini
[Unit]
Description=Hello World Flask HTTP Server
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/opt/hello-server
Environment="PATH=/opt/hello-server/venv/bin"
ExecStart=/opt/hello-server/venv/bin/gunicorn -w 4 -b 0.0.0.0:3000 app:app
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=hello-server

[Install]
WantedBy=multi-user.target
```

**Setup and Enable Service:**

```bash
# Create application directory
sudo mkdir -p /opt/hello-server
sudo cp app.py requirements.txt /opt/hello-server/

# Create virtual environment
cd /opt/hello-server
sudo python3 -m venv venv
sudo ./venv/bin/pip install -r requirements.txt
sudo ./venv/bin/pip install gunicorn

# Set permissions
sudo chown -R www-data:www-data /opt/hello-server

# Reload systemd configuration
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable hello-server

# Start service
sudo systemctl start hello-server

# Check status
sudo systemctl status hello-server

# View logs
sudo journalctl -u hello-server -f

# Stop service (sends SIGTERM)
sudo systemctl stop hello-server
```

### Cloud Platform Deployment

#### AWS Elastic Beanstalk

1. Install AWS EB CLI: `pip install awsebcli`
2. Initialize: `eb init -p python-3.12`
3. Create environment: `eb create production-env`
4. Deploy: `eb deploy`

Create `Procfile`:
```
web: gunicorn -b 0.0.0.0:8000 app:app
```

The server runs on Elastic Beanstalk's Python platform with automatic health checks.

#### Azure App Service

1. Install Azure CLI: Follow Azure documentation
2. Create App Service: `az webapp create --name hello-server --resource-group myResourceGroup --runtime "PYTHON:3.12"`
3. Configure startup command: `az webapp config set --startup-file "gunicorn -b 0.0.0.0:8000 app:app"`
4. Deploy: `az webapp deployment source config-local-git`
5. Push code: `git push azure main`

Azure automatically detects Python application and runs with gunicorn.

#### Google Cloud Run

1. Build container: `gcloud builds submit --tag gcr.io/PROJECT_ID/hello-server`
2. Deploy: `gcloud run deploy hello-server --image gcr.io/PROJECT_ID/hello-server --platform managed --port 3000`

Cloud Run automatically handles scaling and SIGTERM signal handling.

#### Heroku

1. Create Heroku app: `heroku create`
2. Add Procfile: `echo "web: gunicorn app:app" > Procfile`
3. Add runtime.txt: `echo "python-3.12.0" > runtime.txt`
4. Deploy: `git push heroku main`

**Note**: Heroku requires dynamic port binding. Modify `app.py` to use `os.environ.get('PORT', 3000)`.

### Environment Configuration

The server can be configured using environment variables for production flexibility:

**Port Configuration:**

Modify `app.py` to use environment variables:

```python
import os

PORT = int(os.environ.get('PORT', 3000))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT)
```

**Usage:**

```bash
PORT=8080 python app.py
```

**Timeout Configuration:**

Modify `app.py` to use environment variables:

```python
import os

REQUEST_TIMEOUT = int(os.environ.get('REQUEST_TIMEOUT', 30))

# Use REQUEST_TIMEOUT in your timeout handler
```

**Usage:**

```bash
REQUEST_TIMEOUT=60 python app.py
```

### Health Check Implementation

Add a dedicated health check endpoint for load balancers:

**Implementation Guidance:**

Add a health check route in `app.py`:

```python
import time

start_time = time.time()

@app.route('/health', methods=['GET'])
def health_check():
    uptime = time.time() - start_time
    return jsonify({
        'status': 'healthy',
        'uptime': round(uptime, 3)
    }), 200
```

**Health Check Endpoint:**

```bash
curl http://localhost:3000/health
```

**Expected response:**
```json
{"status":"healthy","uptime":123.456}
```

This endpoint can be used by load balancers (AWS ELB, Kubernetes liveness probes) to verify server health.

## Error Handling

The server includes comprehensive error handling for various scenarios:

### Server Error Handling

- **Port conflicts (Address already in use)**: Server exits with error message "Port 3000 is already in use"
- **Permission errors (Permission denied)**: Server exits with error message "Permission denied - cannot bind to port 3000"
- **Other server errors**: Logged but handled gracefully

### Input Validation

The server validates incoming requests and responds appropriately:

- **Missing path or method**: Returns HTTP 400 Bad Request
- **Malformed requests**: Handled gracefully without server crashes

### Request Timeout Handling

- **Timeout duration**: 30 seconds
- **Timeout response**: HTTP 408 Request Timeout
- **Behavior**: Prevents hanging connections and resource leaks

### Request/Response Error Handling

- **Request errors**: Returns HTTP 500 Internal Server Error
- **Response errors**: Logged and handled gracefully
- **Unexpected errors**: Caught and return HTTP 500 with proper cleanup

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error Message:**
```
Port 3000 is already in use
```

**Solutions:**
1. Stop the existing process using port 3000:
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```
2. Or use a different port by modifying `app.py` or using environment variable:
   ```bash
   PORT=8080 python app.py
   ```

#### Permission Denied

**Error Message:**
```
Permission denied - cannot bind to port 3000
```

**Solutions:**
1. Use a port above 1024 (non-privileged port)
2. Or run with sudo (not recommended for production)

#### Connection Refused

**Error when testing:**
```
curl: (7) Failed to connect to localhost port 3000: Connection refused
```

**Solutions:**
1. Ensure the server is running (`python app.py`)
2. Check that the server started successfully
3. Verify firewall settings allow connections to port 3000

#### Request Timeout

**Error when testing with slow connections:**
```
HTTP/1.1 408 Request Timeout
Request Timeout
```

**Solutions:**
1. Normal behavior for connections taking longer than 30 seconds
2. Check network connectivity if timeouts occur immediately
3. Increase timeout duration in `app.py` if needed for specific use cases

#### Module Not Found Error

**Error Message:**
```
ModuleNotFoundError: No module named 'flask'
```

**Solutions:**
1. Ensure virtual environment is activated:
   ```bash
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Debug Information

The server logs all incoming requests with timestamps:
```
2024-01-01T12:00:00.000Z - GET /
2024-01-01T12:00:05.000Z - POST /api/data
```

This logging helps track request patterns and identify issues.

## Requirements

- **Python**: Version 3.9 or higher (3.12 recommended)
- **Flask**: Version 3.1.2 (installed via requirements.txt)
- **Operating System**: Any system supporting Python
- **Network**: Port 3000 available for binding

## Features

- ✅ **Robust Error Handling**: Comprehensive error management without crashes
- ✅ **Graceful Shutdown**: Clean termination on SIGTERM/SIGINT signals  
- ✅ **Input Validation**: Basic request validation to prevent malformed input crashes
- ✅ **Timeout Management**: 30-second request timeout to prevent hanging connections
- ✅ **Resource Cleanup**: Proper cleanup of timeout timers and connections
- ✅ **Production Ready**: Defensive programming practices for stability
- ✅ **Request Logging**: ISO 8601 timestamped logging of all incoming requests
- ✅ **Standards Compliant**: Proper HTTP status codes and headers

## Migration from Node.js

This Python Flask implementation maintains exact functional parity with the original Node.js `server.js`:

| Feature | Node.js | Python Flask |
|---------|---------|--------------|
| HTTP Server | `http.createServer()` | `Flask(__name__)` |
| Port binding | `server.listen(3000)` | `app.run(host='0.0.0.0', port=3000)` |
| Response | `res.end('Hello, World!')` | `return 'Hello, World!', 200` |
| Timeout | `req.setTimeout(30000)` | `threading.Timer(30, callback)` |
| Signal handling | `process.on('SIGTERM')` | `signal.signal(signal.SIGTERM, handler)` |
| Exit codes | `process.exit(0/1)` | `sys.exit(0/1)` |
| Logging | `console.log()` | `print()` |

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request
