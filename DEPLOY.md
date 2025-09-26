# GitHub Pages Deployment Instructions

This project is configured to deploy automatically to GitHub Pages at `sebas10an.github.io/js`.

## Setup Steps

1. **Create a new repository** on GitHub called `js` under your username `sebas10an`
   
2. **Push this code** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/sebas10an/js.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

4. **Automatic Deployment**:
   - The GitHub Action will automatically run when you push to the main branch
   - Your site will be available at `https://sebas10an.github.io/js`

## Configuration Details

- **Base Path**: `/js` (configured in `next.config.js`)
- **Static Export**: Enabled for GitHub Pages compatibility
- **Auto-deployment**: Triggered on push to main branch
- **Build Tool**: Uses npm (you can switch back to Bun if needed)

## Local Development

```bash
npm install
npm run dev
```

## Manual Build

```bash
npm run build
```

This creates the `out` directory with static files ready for deployment.