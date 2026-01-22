# Commit Checklist for GitHub Pages Deployment

## Critical Files to Commit

Run these commands to commit all necessary files:

```bash
cd /app

# Add workflow file
git add .github/workflows/deploy.yml

# Add yarn.lock (IMPORTANT - without this, installation will fail)
git add frontend/yarn.lock

# Add package.json with homepage configured
git add frontend/package.json

# Add all frontend source code
git add frontend/src/
git add frontend/public/

# Add configuration files
git add README.md
git add DEPLOYMENT.md
git add .gitignore

# Commit everything
git commit -m "Configure GitHub Pages deployment with Node.js 20

- Update workflow to use Node.js 20 (required for react-router-dom v7)
- Include yarn.lock for reproducible builds
- Add deployment configuration and documentation"

# Push to GitHub
git push origin main
```

## Verification Before Pushing

Check these before committing:

### 1. Verify Node.js 20 in workflow
```bash
grep "node-version: '20'" .github/workflows/deploy.yml
```
✅ Should output the line with node-version: '20'

### 2. Verify yarn.lock exists
```bash
ls -lh frontend/yarn.lock
```
✅ Should show a file around 500KB

### 3. Verify homepage in package.json
```bash
grep homepage frontend/package.json
```
✅ Should output: "homepage": "https://leeadrian841.github.io/password-check-here"

### 4. Verify 404.html exists
```bash
ls -lh frontend/public/404.html
```
✅ Should show the file exists

## After Pushing

1. Go to: https://github.com/leeadrian841/password-check-here/actions
2. Watch the workflow run (should take 3-5 minutes)
3. Once complete, visit: https://leeadrian841.github.io/password-check-here

## Common Issues

### Issue: "No lockfile found" error
**Solution:** Make sure yarn.lock is committed
```bash
git add frontend/yarn.lock
git commit --amend --no-edit
git push -f origin main
```

### Issue: Node.js version error
**Solution:** Verify workflow uses Node 20
```bash
cat .github/workflows/deploy.yml | grep node-version
```

### Issue: 404 after deployment
**Solution:** 
- Wait 10 minutes for GitHub CDN to update
- Clear browser cache
- Check GitHub Pages settings are set to "GitHub Actions"

## Quick Status Check

```bash
cd /app
echo "=== Checking critical files ==="
echo ""
echo "1. Workflow file:"
test -f .github/workflows/deploy.yml && echo "✅ EXISTS" || echo "❌ MISSING"
echo ""
echo "2. yarn.lock:"
test -f frontend/yarn.lock && echo "✅ EXISTS" || echo "❌ MISSING"
echo ""
echo "3. package.json homepage:"
grep -q "leeadrian841.github.io/password-check-here" frontend/package.json && echo "✅ CONFIGURED" || echo "❌ NOT CONFIGURED"
echo ""
echo "4. Node version in workflow:"
grep -q "node-version: '20'" .github/workflows/deploy.yml && echo "✅ Node 20" || echo "❌ Wrong version"
```

## Ready to Deploy?

If all checks pass, run:
```bash
git push origin main
```

Then monitor at: https://github.com/leeadrian841/password-check-here/actions
