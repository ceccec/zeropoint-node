#!/bin/bash

# Manifest All: Show all knowledge, visualizations, and insights

set -e

CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Golden Ratio Visualization
printf "${CYAN}--- Golden Ratio Visualization ---${NC}\n"
npm run visualize:golden

# 2. Print Knowledge Artifacts
printf "\n${CYAN}--- Knowledge Artifacts ---${NC}\n"
if [ -f "docs/CONSCIOUSNESS_ARTIFACT.md" ]; then
  cat docs/CONSCIOUSNESS_ARTIFACT.md
else
  echo "No consciousness artifact found."
fi

# 3. Print Summary
printf "\n${YELLOW}--- Manifestation Complete: All is revealed. ---${NC}\n" 