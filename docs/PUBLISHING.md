# ZeroPoint Node - Automated Publishing Guide

## 🌟 Overview

ZeroPoint Node uses an automated publishing workflow that handles version management, testing, building, and publishing to npm. This ensures consistent, reliable releases with proper quality checks.

## 🚀 Quick Start

### Manual Publishing

```bash
# Publish a patch version (1.0.0 -> 1.0.1)
npm run publish:patch

# Publish a minor version (1.0.0 -> 1.1.0)
npm run publish:minor

# Publish a major version (1.0.0 -> 2.0.0)
npm run publish:major

# Publish a beta version (1.0.0 -> 1.0.1-beta.0)
npm run publish:beta

# Publish an alpha version (1.0.0 -> 1.0.1-alpha.0)
npm run publish:alpha

# Publish a release candidate (1.0.0 -> 1.0.1-rc.0)
npm run publish:rc
```

### Automated Workflow

```bash
# Use the comprehensive publishing workflow
npm run publish:workflow publish patch

# Or use the script directly
./scripts/publish-workflow.sh publish patch
```

## 📋 Publishing Workflow

### 1. Pre-flight Checks

The workflow performs several checks before publishing:

- **Git Repository**: Ensures you're in a git repository
- **Uncommitted Changes**: Warns about uncommitted changes
- **Branch Check**: Ensures you're on main/master branch
- **Version Existence**: Checks if the version already exists on npm

### 2. Quality Assurance

Before publishing, the workflow runs:

```bash
# Run all tests
npm run test:deployment

# Run linting
npm run lint

# Format code
npm run format

# Build package
npm run build
```

### 3. Version Management

The workflow automatically:

- Updates the version in `package.json`
- Creates a git tag
- Commits the version change
- Pushes to remote repository

### 4. Publishing

- Publishes to npm with appropriate tags
- Creates GitHub releases
- Handles different release types (stable, beta, alpha, rc)

## 🔧 Configuration

### Package.json Scripts

```json
{
  "scripts": {
    "prepublishOnly": "npm run test:deployment && npm run lint && npm run format",
    "publish:patch": "npm version patch && npm publish",
    "publish:minor": "npm version minor && npm publish",
    "publish:major": "npm version major && npm publish",
    "publish:beta": "npm version prerelease --preid=beta && npm publish --tag beta",
    "publish:alpha": "npm version prerelease --preid=alpha && npm publish --tag alpha",
    "publish:rc": "npm version prerelease --preid=rc && npm publish --tag rc",
    "publish:latest": "npm publish --tag latest",
    "publish:dry-run": "npm publish --dry-run",
    "publish:workflow": "./scripts/publish-workflow.sh"
  }
}
```

### .npmrc Configuration

```ini
# Package access (public for open source)
access=public

# Registry
registry=https://registry.npmjs.org/

# Git tag version
git-checks=true

# Package verification
audit=false

# Save exact versions
save-exact=true
```

## 🤖 GitHub Actions

### Automated Publishing

The GitHub Actions workflow (`/.github/workflows/publish.yml`) automatically publishes when:

- A version tag is pushed (e.g., `v1.0.1`)
- Manual workflow dispatch is triggered

### CI/CD Pipeline

The CI workflow (`/.github/workflows/ci.yml`) runs on every push and pull request:

- **Testing**: Runs tests on Node.js 18.x and 20.x
- **Linting**: Checks code quality
- **Security**: Runs security audits
- **Quality**: Checks bundle size and performance

## 📦 Package Structure

### Files Included in npm Package

```json
{
  "files": [
    "dist/**/*",
    "README.md",
    "LICENSE",
    "docs/**/*"
  ]
}
```

### Excluded Files

- Source TypeScript files (`src/`)
- Test files (`__tests__/`)
- Development dependencies
- Configuration files (`.eslintrc`, `jest.config.js`, etc.)
- GitHub Actions workflows

## 🏷️ Version Tags

### Stable Releases

- **Latest**: Most recent stable version
- **Specific**: Exact version number

### Pre-releases

- **Beta**: `npm install zeropoint-node@beta`
- **Alpha**: `npm install zeropoint-node@alpha`
- **RC**: `npm install zeropoint-node@rc`

## 🔐 Security

### NPM Token Setup

1. Create an npm access token:
   ```bash
   npm login
   npm token create
   ```

2. Add to GitHub Secrets:
   - Go to repository settings
   - Add secret: `NPM_TOKEN`
   - Paste your npm token

### Publishing Permissions

- Only maintainers can publish
- Requires npm authentication
- Automated via GitHub Actions

## 📊 Release Process

### 1. Development

```bash
# Make changes and commit
git add .
git commit -m "feat: add new consciousness field feature"
```

### 2. Testing

```bash
# Run tests locally
npm run test:deployment

# Or use the workflow
./scripts/publish-workflow.sh test
```

### 3. Publishing

```bash
# Publish patch version
npm run publish:workflow publish patch

# Or publish with specific tag
npm run publish:workflow publish minor latest
```

### 4. Verification

```bash
# Check published version
npm view zeropoint-node version

# Check all versions
npm view zeropoint-node versions
```

## 🚨 Troubleshooting

### Common Issues

#### Version Already Exists
```bash
# Check if version exists
npm view zeropoint-node@1.0.1 version

# Update to next version
npm run version:patch
```

#### Authentication Issues
```bash
# Login to npm
npm login

# Check authentication
npm whoami
```

#### Git Issues
```bash
# Check git status
git status

# Check branch
git branch --show-current

# Check remote
git remote -v
```

### Debug Mode

```bash
# Run with verbose output
npm run publish:workflow publish patch --verbose

# Check npm configuration
npm config list
```

## 📈 Best Practices

### Version Management

1. **Semantic Versioning**: Follow semver (MAJOR.MINOR.PATCH)
2. **Pre-releases**: Use beta/alpha/rc for testing
3. **Changelog**: Document changes in releases
4. **Tagging**: Always create git tags for releases

### Quality Assurance

1. **Tests**: Ensure all tests pass before publishing
2. **Linting**: Maintain code quality standards
3. **Documentation**: Keep docs up to date
4. **Security**: Regular security audits

### Release Strategy

1. **Feature Branches**: Develop in feature branches
2. **Pull Requests**: Use PRs for code review
3. **CI/CD**: Let automation handle publishing
4. **Monitoring**: Monitor published packages

## 🔗 Related Documentation

- [API Documentation](./API.md)
- [Mathematics Framework](./MATHEMATICS.md)
- [Metaphysical Framework](./METAPHYSICAL.md)
- [Production Guide](./PRODUCTION.md)

## 📞 Support

For publishing issues:

1. Check the troubleshooting section
2. Review GitHub Actions logs
3. Verify npm authentication
4. Check package.json configuration

For questions about ZeroPoint Node:

- GitHub Issues: [Repository Issues](https://github.com/your-repo/issues)
- Documentation: [docs/](./README.md)
- NPM Package: [zeropoint-node](https://www.npmjs.com/package/zeropoint-node) 