# Hello World HTTP Server

A simple HTTP server that responds with "Hello, World!" to all requests. Originally implemented in Node.js, now rewritten in Python 3 using Flask with exact functional parity.

## Features

- Responds with "Hello, World!" to all HTTP methods and paths
- 30-second request timeout with HTTP 408 response
- Graceful shutdown on SIGTERM and SIGINT signals
- ISO 8601 timestamped request logging
- Comprehensive error handling for port conflicts and permission issues
- Listens on port 3000

## Requirements

- Python 3.9 or higher
- pip (Python package manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Create a virtual environment (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Linux/macOS
   # OR
   venv\Scripts\activate     # On Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Quick Start

Start the server:
```bash
python app.py
```

The server will start listening on `http://localhost:3000`

## Testing

Test the server with curl:

```bash
# GET request to root path
curl http://localhost:3000/

# GET request to any path
curl http://localhost:3000/test

# POST request
curl -X POST http://localhost:3000/api

# DELETE request
curl -X DELETE http://localhost:3000/resource

# Check response headers
curl -I http://localhost:3000/
```

All requests return:
- HTTP Status: 200 OK
- Body: `Hello, World!`

## API Behavior

| Method | Path | Response Code | Response Body |
|--------|------|---------------|---------------|
| GET | /* | 200 | Hello, World! |
| POST | /* | 200 | Hello, World! |
| PUT | /* | 200 | Hello, World! |
| DELETE | /* | 200 | Hello, World! |
| PATCH | /* | 200 | Hello, World! |
| HEAD | /* | 200 | (empty) |
| OPTIONS | /* | 200 | Hello, World! |

## Error Handling

| Scenario | Response Code | Response Body |
|----------|---------------|---------------|
| Request timeout (30s) | 408 | Request Timeout |
| Invalid request | 400 | Bad Request |
| Server error | 500 | Internal Server Error |

## Configuration

The server uses the following configuration constants (defined in `app.py`):

| Constant | Value | Description |
|----------|-------|-------------|
| PORT | 3000 | TCP port to listen on |
| REQUEST_TIMEOUT | 30 | Request timeout in seconds |

## Logging

All requests are logged to stdout in ISO 8601 format:
```
2024-01-01T12:00:00.000Z - GET /path
```

## Signal Handling

The server handles the following signals for graceful shutdown:

- **SIGTERM**: Used by Docker, Kubernetes, and process managers
- **SIGINT**: Used by Ctrl+C

Both signals result in:
1. Logging the shutdown event
2. Cleaning up active timers
3. Exiting with code 0

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Clean shutdown (SIGTERM/SIGINT) |
| 1 | Fatal error (port conflict, permission denied) |

## Docker

### Build the image:
```bash
docker build -t hello-world-server .
```

### Dockerfile example:
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 3000

CMD ["python", "app.py"]
```

### Run the container:
```bash
docker run -p 3000:3000 hello-world-server
```

## Production Deployment

For production deployments, use a production WSGI server like gunicorn:

### Install gunicorn:
```bash
pip install gunicorn
```

### Run with gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:3000 app:app
```

### systemd service example:
```ini
[Unit]
Description=Hello World Flask Server
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/app
Environment="PATH=/path/to/venv/bin"
ExecStart=/path/to/venv/bin/gunicorn -w 4 -b 0.0.0.0:3000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

## Architecture

```
┌─────────────────────────────────────────────┐
│                 Flask App                    │
├─────────────────────────────────────────────┤
│  @before_request                            │
│  - Input validation                         │
│  - Timeout timer setup                      │
├─────────────────────────────────────────────┤
│  @app.route('/<path:path>')                 │
│  - Catch-all route                          │
│  - Returns "Hello, World!"                  │
├─────────────────────────────────────────────┤
│  @after_request                             │
│  - Request logging (ISO 8601)               │
│  - Timer cleanup                            │
├─────────────────────────────────────────────┤
│  Error Handlers                             │
│  - 400: Bad Request                         │
│  - 408: Request Timeout                     │
│  - 500: Internal Server Error               │
├─────────────────────────────────────────────┤
│  Signal Handlers                            │
│  - SIGTERM: Graceful shutdown               │
│  - SIGINT: Graceful shutdown                │
└─────────────────────────────────────────────┘
```

## Project Structure

```
.
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── README.md           # This file
└── blitzy/             # Documentation governance
    ├── Project Guide.md
    └── Technical Specifications.md
```

## Migration from Node.js

This Python Flask implementation maintains exact functional parity with the original Node.js `server.js`:

| Feature | Node.js | Python Flask |
|---------|---------|--------------|
| HTTP Server | `http.createServer()` | `Flask()` |
| Port binding | `server.listen(3000)` | `app.run(port=3000)` |
| Response | `res.end('Hello, World!')` | `return 'Hello, World!', 200` |
| Timeout | `req.setTimeout(30000)` | `threading.Timer(30, ...)` |
| Signal handling | `process.on('SIGTERM')` | `signal.signal(SIGTERM)` |
| Exit codes | `process.exit(0/1)` | `sys.exit(0/1)` |

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request
