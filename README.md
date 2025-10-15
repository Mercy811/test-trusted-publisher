# OIDC Trusted Publisher Test Package

This package demonstrates npm's OIDC (OpenID Connect) trusted publishing feature, which allows secure package publishing without long-lived tokens.

## Features

- ✅ Publishes using OIDC trusted publishing
- ✅ Automatic provenance generation
- ✅ No long-lived tokens needed
- ✅ GitHub Actions workflow included

## Installation

```bash
npm install @your-scope/oidc-test-package
```

## Usage

```javascript
const { greet, getPublishInfo } = require('@your-scope/oidc-test-package');

console.log(greet('Developer'));
// Output: Hello, Developer! This package was published using OIDC trusted publishing.

console.log(getPublishInfo());
// Output: { method: 'OIDC Trusted Publishing', security: 'Short-lived credentials', ... }
```

## Setting Up OIDC Trusted Publishing

### Step 1: Configure on npmjs.com

1. Go to your package settings on [npmjs.com](https://www.npmjs.com/)
2. Navigate to **Publishing access** → **Trusted publishers**
3. Click **Add trusted publisher**
4. Select **GitHub Actions** and configure:
   - **Repository owner**: your GitHub username/org
   - **Repository name**: your repository name
   - **Workflow name**: `publish.yml` (must match exactly with `.yml` extension)
   - **Environment name**: (optional, leave blank if not using)

### Step 2: Update Your package.json

Replace the placeholders in `package.json`:
- Change `@your-scope/oidc-test-package` to your actual scoped package name
- Update the repository URLs with your GitHub username and repo name
- Update the author field

### Step 3: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit with OIDC trusted publishing"

# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/oidc-test-package.git
git push -u origin main
```

### Step 4: Create a Release Tag

To trigger the publish workflow:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The GitHub Actions workflow will automatically:
1. Run tests
2. Authenticate using OIDC (no token needed!)
3. Publish the package to npm
4. Generate provenance attestations

## Benefits of OIDC Trusted Publishing

- **Enhanced Security**: No long-lived tokens that can be exposed
- **Automatic Provenance**: Cryptographic proof of package origin
- **Simplified CI/CD**: No need to manage npm tokens
- **Short-lived Credentials**: Tokens are generated on-demand and expire quickly

## Testing Locally

```bash
npm install
npm test
```

## GitHub Actions Workflows

This package includes two workflows:

1. **publish.yml** - Publishes to npm when you push a tag (v*)
2. **test.yml** - Runs tests on pull requests and pushes

## Security Best Practices

After setting up OIDC trusted publishing:

1. Go to your package settings on npmjs.com
2. Navigate to **Publishing access**
3. Select **"Require two-factor authentication and disallow tokens"**
4. This ensures only OIDC publishing is allowed

## Requirements

- npm 11.5.1 or later (for OIDC support)
- GitHub-hosted runners (self-hosted not yet supported)
- Public repository (provenance requires public repos)

## Learn More

- [npm Trusted Publishers Documentation](https://docs.npmjs.com/trusted-publishers)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [OpenSSF Trusted Publishers](https://github.com/ossf/wg-securing-software-repos)

## License

MIT

