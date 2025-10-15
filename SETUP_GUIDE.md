# OIDC Trusted Publisher Setup Guide

This guide walks you through setting up OIDC trusted publishing for this npm package.

## Prerequisites

- A GitHub account
- An npm account
- A scoped npm package name (e.g., `@your-username/package-name`)

## Step-by-Step Setup

### 1. Update package.json

Before publishing, update these fields in `package.json`:

```json
{
  "name": "@YOUR-NPM-USERNAME/oidc-test-package",
  "repository": {
    "url": "git+https://github.com/YOUR-GITHUB-USERNAME/YOUR-REPO-NAME.git"
  },
  "author": "Your Name"
}
```

### 2. Create GitHub Repository

```bash
# Initialize git if not already done
git init

# Create initial commit
git add .
git commit -m "Initial commit: OIDC trusted publisher test package"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### 3. Configure Trusted Publisher on npm

1. **Create the package on npm** (first time only):
   ```bash
   # You need to do this once manually with a token, or create it via the web
   npm publish
   ```
   
   Alternatively, you can claim the package name on npmjs.com without publishing.

2. **Navigate to package settings**:
   - Go to https://www.npmjs.com/
   - Click on your profile → Packages
   - Select your package
   - Go to **Settings** → **Publishing access**

3. **Add trusted publisher**:
   - Click **Add trusted publisher**
   - Select **GitHub Actions**
   - Fill in the form:
     ```
     Repository owner: YOUR-GITHUB-USERNAME
     Repository name: YOUR-REPO-NAME
     Workflow name: publish.yml
     Environment name: (leave blank)
     ```
   - Click **Add trusted publisher**

### 4. Test the Setup

#### Option A: Create a Tag (Recommended)

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

The GitHub Actions workflow will automatically:
- Install dependencies
- Run tests
- Publish using OIDC
- Generate provenance

#### Option B: Manual Trigger

1. Go to your GitHub repository
2. Click **Actions** → **Publish Package**
3. Click **Run workflow**
4. Select the branch
5. Click **Run workflow**

### 5. Verify Publication

1. **Check GitHub Actions**:
   - Go to the **Actions** tab in your repository
   - Verify the workflow completed successfully

2. **Check npm**:
   - Visit your package page: `https://www.npmjs.com/package/@your-username/oidc-test-package`
   - Look for the provenance badge
   - Click on the badge to see attestation details

3. **Test the package**:
   ```bash
   npm install @your-username/oidc-test-package
   node -e "console.log(require('@your-username/oidc-test-package').greet())"
   ```

### 6. Enable Maximum Security (Recommended)

Once OIDC publishing is working:

1. Go to your package **Settings** on npmjs.com
2. Navigate to **Publishing access**
3. Select **"Require two-factor authentication and disallow tokens"**
4. Click **Update Package Settings**

This ensures only OIDC-based publishing is allowed, blocking traditional token-based publishing.

### 7. Revoke Old Tokens (If Any)

If you used tokens before:

1. Go to your npm **Account Settings**
2. Navigate to **Access Tokens**
3. Revoke any tokens that were used for publishing this package
4. Keep read-only tokens if you need them for installing dependencies

## Troubleshooting

### "Unable to authenticate" Error

**Check these common issues:**

1. **Workflow filename mismatch**:
   - The workflow file must be named exactly `publish.yml`
   - The extension must be `.yml` (not `.yaml`)
   - It must be in `.github/workflows/`

2. **Missing OIDC permissions**:
   - Verify `permissions: id-token: write` is in your workflow

3. **npm version**:
   - Ensure npm 11.5.1 or later is installed
   - The workflow includes `npm install -g npm@latest`

4. **Repository mismatch**:
   - Double-check the repository owner and name on npmjs.com
   - They must match your GitHub repository exactly

### Tests Fail During Publish

If tests fail:

```bash
# Run tests locally first
npm install
npm test
```

### Package Name Already Taken

If your package name is taken:

```json
{
  "name": "@your-username/oidc-test-package-v2"
}
```

## Publishing Subsequent Versions

```bash
# Update version in package.json
npm version patch  # or minor, or major

# Push the new tag
git push --follow-tags
```

The workflow will automatically publish the new version.

## Advanced: Using Environments

If you want approval before publishing:

1. Create a GitHub environment called `production`
2. Add protection rules (required reviewers)
3. Update `package.json` trusted publisher config:
   ```
   Environment name: production
   ```
4. Update workflow:
   ```yaml
   jobs:
     publish:
       runs-on: ubuntu-latest
       environment: production  # Add this line
   ```

## Learn More

- [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers)
- [GitHub OIDC Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [npm Provenance](https://docs.npmjs.com/generating-provenance-statements)

## Support

If you encounter issues:
- Check the [npm documentation](https://docs.npmjs.com/trusted-publishers)
- Review GitHub Actions logs
- Check npm status: https://status.npmjs.org/

