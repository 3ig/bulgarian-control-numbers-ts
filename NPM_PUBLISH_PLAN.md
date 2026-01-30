# NPM Publishing Plan

## Overview
This document outlines the steps to publish the modernized Bulgarian Control Numbers library to the npm registry.

## Prerequisites

### 1. NPM Account Setup
- [ ] Create npm account at https://www.npmjs.com/signup (if you don't have one)
- [ ] Verify email address
- [ ] Enable two-factor authentication (2FA) for security (recommended)

### 2. Local NPM Authentication
```bash
# Login to npm from terminal
npm login

# Verify you're logged in
npm whoami
```

### 3. Package Name Verification
**Current package name**: `bulgarian-control-numbers`

**Important**: This name is already taken by the original author (petarov). You have two options:

#### Option A: Use a Different Package Name (Recommended)
Update `package.json` to use a new name that reflects the TypeScript version:
- `bulgarian-control-numbers-ts`
- `bulgarian-control-numbers-typescript`
- `@3ig/bulgarian-control-numbers` (scoped package)

#### Option B: Check if Original Package is Maintained
- Check npm: https://www.npmjs.com/package/bulgarian-control-numbers
- If unmaintained, you could request transfer (complex process)

**Recommendation**: Use `bulgarian-control-numbers-ts` or scoped package `@3ig/bulgarian-control-numbers`

## Pre-Publishing Checklist

### 1. Verify Package Configuration
- [ ] Package name is available and appropriate
- [ ] Version number is correct (start with `1.0.0` or `2.0.0` for modernization)
- [ ] Description is clear and accurate
- [ ] Keywords are relevant
- [ ] Repository URL is correct
- [ ] Author and contributors are properly credited
- [ ] License is correct (MIT)

### 2. Build Verification
```bash
# Clean previous builds
rm -rf build/

# Run type checking
yarn type-check

# Run all tests
yarn test

# Build the package
yarn build

# Verify build outputs exist
ls -la build/
# Should see:
# - bgcn.js (UMD)
# - bgcn.esm.js (ESM)
# - *.d.ts files (TypeScript definitions)
```

### 3. Test Package Locally
```bash
# Pack the package (creates .tgz file without publishing)
npm pack

# Test install locally
npm install ./bulgarian-control-numbers-ts-1.0.0.tgz

# Or use yarn
yarn add file:./bulgarian-control-numbers-ts-1.0.0.tgz

# Test in a test project
cd /tmp
mkdir test-bgcn && cd test-bgcn
npm init -y
npm install /path/to/bulgarian-control-numbers-ts-1.0.0.tgz

# Test both CommonJS and ESM imports
node -e "const BGCN = require('bulgarian-control-numbers-ts').default; console.log(BGCN.egn('0550290476').isValid);"
```

### 4. Verify Package Contents
```bash
# Check what will be published
npm pack --dry-run

# Or inspect the package.json "files" field
# Should include: ["build", "src"]
```

### 5. Update Version Number
```bash
# For initial publish, use 1.0.0 or 2.0.0
# Update in package.json manually or use:
npm version 1.0.0 --no-git-tag

# Or for patch/minor/major:
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0
```

## Publishing Steps

### Step 1: Final Verification
```bash
# Ensure you're on the correct branch
git status

# Ensure build is up to date
yarn build

# Run final tests
yarn test
```

### Step 2: Update Package Name (if needed)
If changing package name, update `package.json`:
```json
{
  "name": "bulgarian-control-numbers-ts",  // or "@3ig/bulgarian-control-numbers"
  "version": "1.0.0"
}
```

### Step 3: Dry Run (Test without publishing)
```bash
# See what would be published
npm publish --dry-run

# Check package size (should be reasonable)
npm pack
ls -lh *.tgz
```

### Step 4: Publish to NPM
```bash
# Publish public package
npm publish

# Or for scoped package (if using @3ig/...)
npm publish --access public
```

### Step 5: Verify Publication
```bash
# Check package on npm website
# Visit: https://www.npmjs.com/package/YOUR-PACKAGE-NAME

# Test install from npm
cd /tmp
mkdir test-install && cd test-install
npm init -y
npm install YOUR-PACKAGE-NAME

# Verify it works
node -e "const BGCN = require('YOUR-PACKAGE-NAME').default; console.log('Works!', BGCN.egn('0550290476').isValid);"
```

## Post-Publishing

### 1. Create Git Tag
```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0

# Or if npm version was used, tag is created automatically
```

### 2. Update Repository
```bash
# Commit any final changes (like version bump)
git add package.json
git commit -m "Bump version to 1.0.0 for npm publish"
git push origin main
```

### 3. Create GitHub Release
- Go to GitHub repository
- Click "Releases" → "Create a new release"
- Tag: `v1.0.0`
- Title: `v1.0.0 - TypeScript Modernization`
- Description: Include changelog and features

## Version Management Strategy

### Semantic Versioning (SemVer)
- **MAJOR** (2.0.0): Breaking changes
- **MINOR** (1.1.0): New features, backward compatible
- **PATCH** (1.0.1): Bug fixes, backward compatible

### Future Updates
```bash
# For bug fixes
npm version patch
npm publish

# For new features
npm version minor
npm publish

# For breaking changes
npm version major
npm publish
```

## Troubleshooting

### Common Issues

1. **Package name already taken**
   - Solution: Use different name or scoped package

2. **Authentication errors**
   - Solution: Run `npm login` again

3. **2FA required**
   - Solution: Enable 2FA and use OTP when publishing

4. **Build files missing**
   - Solution: Ensure `yarn build` runs before `npm publish`
   - Check `package.json` "files" field includes "build"

5. **Type definitions not included**
   - Solution: Verify `types` field in package.json points to correct file
   - Check that `vite-plugin-dts` generated .d.ts files

## Package.json Fields to Verify

```json
{
  "name": "bulgarian-control-numbers-ts",  // Unique name
  "version": "1.0.0",                      // Semantic version
  "description": "...",                    // Clear description
  "main": "build/bgcn.js",                // UMD entry point
  "module": "build/bgcn.esm.js",          // ESM entry point
  "types": "build/index.d.ts",            // TypeScript definitions
  "files": ["build", "src"],              // What gets published
  "keywords": ["egn", "bulstat", "iban", "bulgarian", "typescript"],
  "repository": {
    "type": "git",
    "url": "https://github.com/3ig/bulgarian-control-numbers-ts.git"
  },
  "license": "MIT"
}
```

## Recommended Package Name Options

1. **`bulgarian-control-numbers-ts`** (Recommended)
   - Clear indication of TypeScript version
   - Easy to find for users looking for TS version

2. **`@3ig/bulgarian-control-numbers`** (Scoped)
   - Professional scoped package
   - Less likely to have naming conflicts
   - Requires `--access public` flag

3. **`bulgarian-control-numbers-typescript`**
   - Very descriptive
   - Longer name

## Next Steps

1. [ ] Decide on package name
2. [ ] Update package.json with chosen name
3. [ ] Verify npm account and login
4. [ ] Run pre-publishing checklist
5. [ ] Test package locally with `npm pack`
6. [ ] Publish to npm
7. [ ] Verify on npm website
8. [ ] Create GitHub release
9. [ ] Update README with npm install instructions

## Additional Resources

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Package.json Documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
