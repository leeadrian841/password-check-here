# PasswordCheckHere

A modern, AI-powered password strength checker with comprehensive breach database scanning.

## Features

- **Real-time Password Analysis** - Instant feedback on password strength
- **Breach Database Check** - Scans against 17+ billion compromised passwords from major breaches
- **Character Diversity Analysis** - Checks for lowercase, uppercase, numbers, and special characters
- **Estimated Breach Time** - Calculates how long AI would take to crack your password
- **Security Recommendations** - Actionable suggestions to improve password strength
- **100% Client-Side** - All analysis happens in your browser, no data sent to servers

## Live Demo

Visit: [https://leeadrian841.github.io/password-check-here](https://leeadrian841.github.io/password-check-here)

## Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment.

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Wait for deployment:**
   - GitHub Actions will automatically build and deploy your app
   - Check the "Actions" tab to monitor the deployment
   - Your site will be live at: https://leeadrian841.github.io/password-check-here

### Option 2: Manual Deployment

If you prefer manual deployment:

```bash
cd frontend
yarn install
yarn deploy
```

This will build the app and deploy it to the `gh-pages` branch.

## Local Development

1. **Install dependencies:**
   ```bash
   cd frontend
   yarn install
   ```

2. **Start development server:**
   ```bash
   yarn start
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
cd frontend
yarn build
```

The optimized build will be in the `frontend/build` folder.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Shadcn UI
- **Typography:** Space Grotesk, IBM Plex Mono
- **Icons:** Lucide React
- **Routing:** React Router
- **Build Tool:** Create React App with Craco

## Breach Databases Checked

- HaveIBeenPwned (11B+ records)
- RockYou breach (32M)
- LinkedIn breach (6.5M)
- Adobe breach (150M)
- Yahoo breaches (3B)
- MySpace breach (360M)
- Dropbox breach (68M)
- Tumblr breach (65M)
- Collection #1-5 (2.2B)
- Common keyboard patterns (10K+)

## Privacy & Security

- All password analysis happens client-side in your browser
- No passwords are stored or transmitted to any server
- No backend required - purely frontend application
- Your data remains 100% private

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
