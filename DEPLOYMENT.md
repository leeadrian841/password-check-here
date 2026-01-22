# GitHub Pages Deployment Guide

## Prerequisites

- Git installed on your computer
- GitHub account
- Repository created at: https://github.com/leeadrian841/password-check-here

## Step-by-Step Deployment Instructions

### Step 1: Initialize Git Repository (if not already done)

```bash
cd /app
git init
git branch -M main
```

### Step 2: Add Remote Repository

```bash
git remote add origin https://github.com/leeadrian841/password-check-here.git
```

Or if you're using SSH:

```bash
git remote add origin git@github.com:leeadrian841/password-check-here.git
```

### Step 3: Configure GitHub Pages Settings

1. Go to your repository on GitHub: https://github.com/leeadrian841/password-check-here
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under **"Build and deployment"**:
   - Source: Select **"GitHub Actions"**
   - This enables the automated deployment workflow

### Step 4: Commit and Push Your Code

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Password strength checker app"

# Push to GitHub
git push -u origin main
```

### Step 5: Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 2-5 minutes)
4. Once complete, your site will be live!

### Step 6: Access Your Live Site

Your site will be available at:
**https://leeadrian841.github.io/password-check-here**

## Alternative: Manual Deployment

If you prefer to deploy manually without GitHub Actions:

```bash
cd /app/frontend
yarn install
yarn deploy
```

This will:
1. Build the production version
2. Push it to the `gh-pages` branch
3. Your site will be live in a few minutes

**Note:** For manual deployment, you need to set the GitHub Pages source to the `gh-pages` branch in your repository settings.

## Troubleshooting

### Issue: GitHub Actions workflow fails

**Solution:**
1. Check the Actions tab for error details
2. Ensure you've enabled GitHub Actions in repository settings
3. Verify the workflow has proper permissions

### Issue: Site shows 404 error

**Solution:**
1. Wait a few minutes after deployment
2. Clear your browser cache
3. Check GitHub Pages settings are correct
4. Ensure the repository is public (GitHub Pages doesn't work on private repos with free accounts)

### Issue: Routing doesn't work (404 on refresh)

**Solution:**
- The `404.html` file is already configured to handle SPA routing
- This should work automatically with GitHub Pages

### Issue: Site not updating after push

**Solution:**
1. Check the Actions tab to ensure the workflow ran
2. Wait 5-10 minutes for GitHub CDN to update
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

## Making Updates

After the initial deployment, any push to the main branch will automatically trigger a new deployment:

```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main
```

The site will update automatically within a few minutes!

## Local Testing Before Deployment

Always test locally before deploying:

```bash
cd /app/frontend
yarn start
```

Then test your changes at http://localhost:3000

## Build Test

To ensure your app builds correctly:

```bash
cd /app/frontend
yarn build
```

Check the `build` folder to see the production files.

## Important Files

- `package.json` - Contains homepage URL and deploy scripts
- `.github/workflows/deploy.yml` - GitHub Actions workflow for auto-deployment
- `public/404.html` - Handles SPA routing on GitHub Pages
- `public/index.html` - Updated with GitHub Pages routing script

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review the build output
3. Ensure all dependencies are installed correctly
4. Verify the homepage URL in package.json matches your repository

Your site URL: https://leeadrian841.github.io/password-check-here
