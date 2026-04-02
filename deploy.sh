#!/bin/bash
set -e

echo "=== Jones County XC Deployment Script ==="
echo "Started at: $(date)"

# Configuration
BACKEND_DIR="$HOME/jones-county-xc-backend"
SERVICE_NAME="xc-backend"
BINARY_NAME="xc-backend"
BINARY_PATH="$BACKEND_DIR/$BINARY_NAME"

echo ""
echo "=== Verifying backend binary ==="
if [ ! -f "$BINARY_PATH" ]; then
    echo "Error: expected binary not found at $BINARY_PATH"
    exit 1
fi
chmod +x "$BINARY_PATH"
echo "Binary verified: $BINARY_PATH"

echo ""
echo "=== Restarting systemd service ==="
sudo systemctl restart "$SERVICE_NAME"
sudo systemctl is-active --quiet "$SERVICE_NAME"
echo "Service '$SERVICE_NAME' restarted successfully"

echo ""
echo "=== Deployment completed successfully ==="
echo "Finished at: $(date)"
