#!/bin/bash

# ZeroPoint Node - Automated Publishing Workflow
# This script handles version management, testing, building, and publishing to npm

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
}

# Function to check if we have uncommitted changes
check_uncommitted_changes() {
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes. Please commit or stash them before publishing."
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Function to check if we're on main branch
check_main_branch() {
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
        print_warning "You're not on the main branch (current: $current_branch)"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    npm run test:deployment
    print_success "Tests passed"
}

# Function to run linting
run_linting() {
    print_status "Running linting..."
    npm run lint
    print_success "Linting passed"
}

# Function to format code
format_code() {
    print_status "Formatting code..."
    npm run format
    print_success "Code formatted"
}

# Function to build package
build_package() {
    print_status "Building package..."
    npm run build
    print_success "Package built successfully"
}

# Function to check if version exists on npm
check_version_exists() {
    local version=$1
    local package_name=$(node -p "require('./package.json').name")
    
    if npm view "$package_name@$version" version >/dev/null 2>&1; then
        print_error "Version $version already exists on npm"
        return 1
    fi
    return 0
}

# Function to publish to npm
publish_to_npm() {
    local tag=$1
    print_status "Publishing to npm with tag: $tag"
    
    if [ "$tag" = "latest" ]; then
        npm publish --access public
    else
        npm publish --access public --tag "$tag"
    fi
    
    print_success "Published to npm successfully"
}

# Function to create git tag
create_git_tag() {
    local version=$1
    print_status "Creating git tag: v$version"
    git tag "v$version"
    print_success "Git tag created: v$version"
}

# Function to push to remote
push_to_remote() {
    print_status "Pushing to remote repository..."
    git push origin main
    git push origin --tags
    print_success "Pushed to remote repository"
}

# Function to show current version
show_current_version() {
    local version=$(node -p "require('./package.json').version")
    print_status "Current version: $version"
}

# Function to show available versions on npm
show_npm_versions() {
    local package_name=$(node -p "require('./package.json').name")
    print_status "Available versions on npm:"
    
    # Check if package exists on npm
    if npm view "$package_name" version >/dev/null 2>&1; then
        npm view "$package_name" versions --json | node -e "
            try {
                const versions = JSON.parse(require('fs').readFileSync(0, 'utf8'));
                if (Array.isArray(versions)) {
                    versions.forEach(v => console.log('  -', v));
                } else {
                    console.log('  -', versions);
                }
            } catch (e) {
                console.log('  No versions found or error parsing response');
            }
        "
    else
        print_warning "Package '$package_name' not found on npm (first time publishing)"
    fi
}

# Main publishing function
publish() {
    local version_type=$1
    local tag=${2:-latest}
    
    print_status "Starting publishing workflow for $version_type version"
    
    # Pre-flight checks
    check_git_repo
    check_uncommitted_changes
    check_main_branch
    
    # Show current version
    show_current_version
    
    # Run quality checks
    run_tests
    run_linting
    format_code
    
    # Build package
    build_package
    
    # Update version
    print_status "Updating version to $version_type..."
    case $version_type in
        patch)
            npm version patch --no-git-tag-version
            ;;
        minor)
            npm version minor --no-git-tag-version
            ;;
        major)
            npm version major --no-git-tag-version
            ;;
        beta)
            npm version prerelease --preid=beta --no-git-tag-version
            ;;
        alpha)
            npm version prerelease --preid=alpha --no-git-tag-version
            ;;
        rc)
            npm version prerelease --preid=rc --no-git-tag-version
            ;;
        *)
            print_error "Invalid version type: $version_type"
            print_status "Valid types: patch, minor, major, beta, alpha, rc"
            exit 1
            ;;
    esac
    
    # Get new version
    local new_version=$(node -p "require('./package.json').version")
    print_success "Version updated to: $new_version"
    
    # Check if version exists
    if ! check_version_exists "$new_version"; then
        exit 1
    fi
    
    # Publish to npm
    publish_to_npm "$tag"
    
    # Create git tag
    create_git_tag "$new_version"
    
    # Commit version change
    git add package.json
    git commit -m "chore: bump version to $new_version"
    
    # Push to remote
    push_to_remote
    
    print_success "Publishing workflow completed successfully!"
    print_status "Version $new_version is now available on npm"
}

# Function to show help
show_help() {
    echo "ZeroPoint Node - Publishing Workflow"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  publish <type> [tag]  Publish a new version"
    echo "  version <type>        Update version without publishing"
    echo "  test                  Run tests and quality checks"
    echo "  build                 Build the package"
    echo "  check                 Check current version and npm status"
    echo "  help                  Show this help message"
    echo ""
    echo "Version Types:"
    echo "  patch                 Patch version (1.0.0 -> 1.0.1)"
    echo "  minor                 Minor version (1.0.0 -> 1.1.0)"
    echo "  major                 Major version (1.0.0 -> 2.0.0)"
    echo "  beta                  Beta prerelease (1.0.0 -> 1.0.1-beta.0)"
    echo "  alpha                 Alpha prerelease (1.0.0 -> 1.0.1-alpha.0)"
    echo "  rc                    Release candidate (1.0.0 -> 1.0.1-rc.0)"
    echo ""
    echo "Tags:"
    echo "  latest                Latest stable version (default)"
    echo "  beta                  Beta version tag"
    echo "  alpha                 Alpha version tag"
    echo "  rc                    Release candidate tag"
    echo ""
    echo "Examples:"
    echo "  $0 publish patch"
    echo "  $0 publish minor latest"
    echo "  $0 publish beta beta"
    echo "  $0 version patch"
    echo "  $0 test"
}

# Main script logic
case "${1:-help}" in
    publish)
        if [ -z "$2" ]; then
            print_error "Version type required"
            show_help
            exit 1
        fi
        publish "$2" "$3"
        ;;
    version)
        if [ -z "$2" ]; then
            print_error "Version type required"
            show_help
            exit 1
        fi
        npm run "version:$2"
        print_success "Version updated"
        ;;
    test)
        run_tests
        run_linting
        format_code
        print_success "All tests passed"
        ;;
    build)
        build_package
        ;;
    check)
        show_current_version
        show_npm_versions
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac 