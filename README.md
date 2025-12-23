# Amrit Chauhan Portfolio

Personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Deployment Instructions

### Step 1: Download and Extract
Download the `portfolio-project.zip` file and extract it to a folder on your computer.

### Step 2: Open Terminal/Command Prompt
Navigate to the extracted folder:
```bash
cd path/to/portfolio-project
```

### Step 3: Install Node.js (if not installed)
Download and install Node.js from https://nodejs.org (use the LTS version)

Verify installation:
```bash
node --version
npm --version
```

### Step 4: Install Dependencies
```bash
npm install
```

### Step 5: Test Locally (Optional)
```bash
npm run dev
```
Open http://localhost:5173 in your browser to preview.

### Step 6: Push to GitHub

**Option A: If amritsc.github.io repo is empty:**
```bash
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/amritsc/amritsc.github.io.git
git push -u origin main
```

**Option B: If repo already has files:**
```bash
git clone https://github.com/amritsc/amritsc.github.io.git
cd amritsc.github.io
# Copy all files from portfolio-project into this folder (overwrite if prompted)
git add .
git commit -m "Deploy portfolio"
git push
```

### Step 7: Enable GitHub Pages
1. Go to https://github.com/amritsc/amritsc.github.io
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. Wait 2-3 minutes for deployment

### Step 8: View Your Site
Visit: **https://amritsc.github.io**

---

## 📁 Project Structure
```
portfolio-project/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deployment config
├── public/
│   └── favicon.svg         # Browser tab icon
├── src/
│   ├── App.jsx             # Main portfolio component
│   ├── index.css           # Tailwind styles
│   └── main.jsx            # React entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠 Tech Stack
- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion 11

## 📝 Making Changes
1. Edit `src/App.jsx` for content changes
2. Run `npm run dev` to preview locally
3. Commit and push to deploy automatically

## 🐛 Troubleshooting

**Build fails:**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

**Pages not updating:**
- Check Actions tab on GitHub for build status
- Clear browser cache (Ctrl+Shift+R)

**404 on refresh:**
- This is normal for single-page apps on GitHub Pages
- Navigation within the site works fine
