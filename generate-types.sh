#!/bin/bash
# generate-types.sh
# This script converts Pydantic models into TypeScript interfaces.

set -e  # Exit immediately if a command exits with a non-zero status.

pydantic2ts \
  --module api/models.py \
  --output src/api/index.ts \
  --json2ts-cmd "npx --prefix frontend json2ts"

echo "TypeScript definitions generated at src/api/index.ts"