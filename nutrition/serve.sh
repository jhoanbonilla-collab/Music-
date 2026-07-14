#!/usr/bin/env sh
# Serve NourishWeek on http://localhost:8787
# Usage: ./serve.sh   (or: sh serve.sh)
cd "$(dirname "$0")"
PORT="${PORT:-8787}"
echo ""
echo "  NourishWeek is running →  http://localhost:$PORT"
echo "  Press Ctrl+C to stop."
echo ""
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT" --bind 127.0.0.1
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server "$PORT" --bind 127.0.0.1
elif command -v npx >/dev/null 2>&1; then
  exec npx --yes serve -l "$PORT" .
else
  echo "No python3 or npx found. Just open index.html directly in your browser instead."
  exit 1
fi
