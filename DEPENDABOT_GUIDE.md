# Dependabot Auto-Update and Auto-Merge Configuration

## Overview

Dependabot is configured to automatically:
1. Check for dependency updates weekly (every Monday at 9 AM)
2. Create pull requests for outdated dependencies
3. Automatically approve and merge minor and patch updates
4. Run tests before merging
5. Alert for major version updates (requires manual review)

## What Gets Auto-Merged

### ✅ Automatically Merged
- **Patch updates** (1.2.3 → 1.2.4) - Bug fixes, no breaking changes
- **Minor updates** (1.2.3 → 1.3.0) - New features, backward compatible

### ⚠️ Requires Manual Review
- **Major updates** (1.2.3 → 2.0.0) - May contain breaking changes
- Updates that fail build or tests

## Configuration Files

### 1. `.github/dependabot.yml`
Main Dependabot configuration:
- Monitors frontend npm packages
- Monitors GitHub Actions versions
- Groups related packages (React, Radix UI, dev dependencies)
- Runs weekly on Mondays at 9 AM

### 2. `.github/workflows/dependabot-auto-merge.yml`
Auto-merge workflow:
- Automatically approves patch/minor updates
- Enables auto-merge using squash strategy
- Comments on major updates with warnings
- Only runs for Dependabot PRs

### 3. `.github/workflows/dependabot-checks.yml`
Quality checks before merging:
- Installs dependencies
- Runs linter
- Builds the application
- Ensures build succeeds before auto-merge

## How It Works

### Workflow Process

```
Monday 9 AM
    ↓
Dependabot checks for updates
    ↓
Creates PR for each update
    ↓
Dependabot Checks workflow runs
    ↓
├─ Install dependencies
├─ Run linter
└─ Build application
    ↓
If patch/minor update:
    ↓
├─ Auto-approve PR
├─ Enable auto-merge
└─ Merge when checks pass
    ↓
If major update:
    ↓
├─ Add warning comment
└─ Wait for manual review
```

## Repository Settings Required

### Enable Auto-Merge in Repository

1. Go to: https://github.com/leeadrian841/password-check-here/settings
2. Scroll to "Pull Requests" section
3. Check: ✅ "Allow auto-merge"
4. Check: ✅ "Automatically delete head branches"

### Branch Protection (Optional but Recommended)

For `main` branch:
1. Go to: Settings → Branches → Branch protection rules
2. Add rule for `main`
3. Enable:
   - ✅ "Require status checks to pass before merging"
   - Select: "test-and-build" check
   - ✅ "Require branches to be up to date before merging"

## Monitoring Dependabot

### View Dependabot PRs
- Repository → Pull Requests
- Filter: `is:pr author:app/dependabot`

### View Dependabot Insights
- Repository → Insights → Dependency graph → Dependabot

### Check Auto-Merge Status
- Open any Dependabot PR
- Look for "Enable auto-merge" status near merge button

## Customization

### Change Update Schedule

Edit `.github/dependabot.yml`:
```yaml
schedule:
  interval: "daily"  # Options: daily, weekly, monthly
  day: "monday"      # For weekly: monday-sunday
  time: "09:00"      # Time in UTC
```

### Change Auto-Merge Rules

Edit `.github/workflows/dependabot-auto-merge.yml`:

**To only auto-merge patch updates:**
```yaml
if: steps.metadata.outputs.update-type == 'version-update:semver-patch'
```

**To auto-merge all updates (not recommended):**
```yaml
if: steps.metadata.outputs.update-type != ''
```

### Add More Package Groups

Edit `.github/dependabot.yml`:
```yaml
groups:
  testing-packages:
    patterns:
      - "jest*"
      - "@testing-library/*"
```

## Security

### Dependabot Security Updates
- Enabled by default for security vulnerabilities
- Creates PRs immediately (not on schedule)
- Marked with "security" label
- Should be reviewed and merged ASAP

### Review Security Alerts
- Repository → Security → Dependabot alerts

## Disable Auto-Merge

### Temporarily Disable
Add label `dependencies-skip-auto-merge` to any PR to prevent auto-merge.

### Permanently Disable
Delete or rename: `.github/workflows/dependabot-auto-merge.yml`

## Troubleshooting

### PR Not Auto-Merging

**Check 1: Auto-merge enabled in repo?**
```
Settings → Pull Requests → Allow auto-merge ✅
```

**Check 2: Is it a patch/minor update?**
- View PR title: should say "Bump ... from X.Y.Z to X.Y.Z"
- Major updates won't auto-merge (by design)

**Check 3: Did checks pass?**
- Look for green checkmarks on PR
- If red X, click to see error logs

**Check 4: Branch protection rules?**
- Ensure Dependabot has permission to merge
- Check Settings → Branches

### Too Many PRs

Reduce in `.github/dependabot.yml`:
```yaml
open-pull-requests-limit: 5  # Reduce from 10
```

Or group more dependencies:
```yaml
groups:
  all-dependencies:
    patterns:
      - "*"
```

### Build Failing on Dependabot PR

1. Check the Actions tab for error details
2. Locally test the update:
   ```bash
   git fetch origin pull/XXX/head:dependabot-test
   git checkout dependabot-test
   cd frontend
   yarn install
   yarn build
   ```
3. Fix issues, commit, and push to the PR branch

## Benefits

✅ **Security**: Automatically patches vulnerabilities
✅ **Up-to-date**: Never fall behind on dependencies
✅ **Time-saving**: No manual dependency management
✅ **Safe**: Tests run before merging
✅ **Controlled**: Major updates require review
✅ **Organized**: Groups related updates together

## Deployment

```bash
cd /app

# Add all Dependabot files
git add .github/dependabot.yml
git add .github/workflows/dependabot-auto-merge.yml
git add .github/workflows/dependabot-checks.yml
git add frontend/package.json

# Commit
git commit -m "feat: Add Dependabot with auto-merge for minor/patch updates"

# Push
git push origin main
```

## Verification

After pushing:
1. Go to repository Settings → Code security and analysis
2. Look for "Dependabot" section
3. Should show "Dependabot alerts: Enabled"
4. First Dependabot PRs will appear next Monday

## Force Dependabot Check (Optional)

To trigger Dependabot immediately:
1. Go to: Insights → Dependency graph → Dependabot
2. Click "Last checked: X minutes ago"
3. Click "Check for updates" button

## Example PR

When working correctly, you'll see:
- PR title: "Bump react from 19.0.0 to 19.0.1"
- Label: "dependencies", "javascript"
- Status: ✅ All checks passed
- Status: "Auto-merge enabled"
- Comment: "Automatically approved by Dependabot Auto-Merge workflow"

Your dependencies will stay updated automatically! 🚀
