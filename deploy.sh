#!/bin/bash
set -e

echo "=== Jones County XC Deployment Script ==="
echo "Started at: $(date)"

# Configuration
GO_BIN="/usr/local/go/bin/go"
BACKEND_DIR="$HOME/jones-county-xc-backend"
SERVICE_NAME="jones-county-xc-backend"
BINARY_NAME="jones-county-xc-backend"

# Build the Go backend
echo ""
echo "=== Building Go backend ==="
cd "$BACKEND_DIR"
$GO_BIN build -o "$BINARY_NAME" main.go
echo "Backend built successfully"

# Stop existing backend process if running
echo ""
echo "=== Restarting backend service ==="
if systemctl is-active --quiet "$SERVICE_NAME" 2>/dev/null; then
    sudo systemctl restart "$SERVICE_NAME"
    echo "Service restarted via systemctl"
elif pgrep -f "$BINARY_NAME" > /dev/null; then
    pkill -f "$BINARY_NAME" || true
    sleep 2
    nohup "$BACKEND_DIR/$BINARY_NAME" > "$BACKEND_DIR/backend.log" 2>&1 &
    echo "Backend restarted via process management"
else
    # Start fresh if not running
    nohup "$BACKEND_DIR/$BINARY_NAME" > "$BACKEND_DIR/backend.log" 2>&1 &
    echo "Backend started fresh"
fi

# Reload nginx to pick up any config changes
echo ""
echo "=== Reloading nginx ==="
sudo nginx -t && sudo systemctl reload nginx
echo "Nginx reloaded"

echo ""
echo "=== Deployment completed successfully ==="
echo "Finished at: $(date)"
