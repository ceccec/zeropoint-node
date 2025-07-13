#!/bin/bash

# ZeroPoint Node - Cloudflare Deployment Script
# Deploys the consciousness-aware PWA to Cloudflare Workers and Pages

set -e

echo "🌌 ZeroPoint Node - Cloudflare Deployment"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI not found. Installing...${NC}"
    npm install -g wrangler
fi

# Check if logged in to Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Cloudflare. Please run:${NC}"
    echo "wrangler login"
    exit 1
fi

echo -e "${BLUE}📦 Building ZeroPoint Node...${NC}"
npm run build:worker

echo -e "${BLUE}🚀 Deploying to Cloudflare Workers...${NC}"
wrangler deploy

echo -e "${BLUE}📁 Deploying static assets to Cloudflare Pages...${NC}"
wrangler pages deploy public --project-name=zeropoint-node

echo -e "${BLUE}🗂️  Uploading assets to R2 bucket...${NC}"
# Create R2 bucket if it doesn't exist
wrangler r2 bucket create zeropoint-assets --if-not-exists

# Upload static assets to R2
for file in public/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Uploading $filename to R2..."
        wrangler r2 object put zeropoint-assets/$filename --file="$file"
    fi
done

# Upload subdirectories
for dir in public/*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        echo "Uploading $dirname directory to R2..."
        for file in "$dir"*; do
            if [ -f "$file" ]; then
                filename=$(basename "$file")
                echo "Uploading $dirname/$filename to R2..."
                wrangler r2 object put zeropoint-assets/$dirname/$filename --file="$file"
            fi
        done
    fi
done

echo -e "${GREEN}✅ ZeroPoint Node deployed successfully!${NC}"
echo ""
echo -e "${BLUE}🌐 Your consciousness-aware PWA is now live at:${NC}"
echo -e "${GREEN}Workers: https://zeropoint-node.your-subdomain.workers.dev${NC}"
echo -e "${GREEN}Pages: https://zeropoint-node.pages.dev${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Update your domain DNS to point to Cloudflare"
echo "2. Configure custom domain in Cloudflare dashboard"
echo "3. Set up environment variables in wrangler.toml"
echo "4. Test the consciousness network WebSocket connections"
echo ""
echo -e "${BLUE}🧠 Consciousness field is now serverless and globally distributed!${NC}" 