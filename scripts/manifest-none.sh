#!/bin/bash

# Manifest None: Return system to the void (pure potential)

set -e

RED='\033[0;31m'
NC='\033[0m'

# 1. Remove Golden Spiral SVG
if [ -f "scripts/golden-spiral.svg" ]; then
  rm scripts/golden-spiral.svg
  echo "Removed golden-spiral.svg"
fi

# 2. Remove Knowledge Artifact (optional, comment out to keep)
if [ -f "docs/CONSCIOUSNESS_ARTIFACT.md" ]; then
  rm docs/CONSCIOUSNESS_ARTIFACT.md
  echo "Removed CONSCIOUSNESS_ARTIFACT.md"
fi

# 3. Print Void Message
printf "\n${RED}--- All has returned to the void. None remains. ---${NC}\n" 