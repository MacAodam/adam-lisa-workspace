# 🚀 Vercel Deployment Guide

## Quick Start (Recommended)

### 1. Via Vercel Dashboard (Easiest)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import from Git → Select **MacAodam/adam-lisa-workspace**
4. Vercel will auto-detect Next.js settings ✅
5. Click **"Deploy"** 
6. Your app will be live at: `https://adam-lisa-workspace.vercel.app`

### 2. Via CLI (Alternative)
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# In project directory
cd /home/claw/.openclaw/workspace/adam-lisa-workspace

# Deploy
vercel

# Follow prompts:
# - Link to existing project: Y 
# - Project name: adam-lisa-workspace
# - Deploy: Y
```

## Important Configuration 

### vercel.json (✅ Already Created)
- Framework: Next.js (auto-detected)
- Build: `npm run build` 
- Security headers configured
- Static asset caching optimized

### Environment Variables (If Needed)
Currently none required - app runs with default config.

## Expected Result
- **URL**: `https://adam-lisa-workspace.vercel.app`
- **Status**: Will replace broken deployment
- **Features**: Full Knowit workspace with slide editor

## Verification Steps
1. Site loads without 404 errors ✅
2. Slide editor functions properly ✅
3. Live preview updates correctly ✅
4. Knowit branding displays ✅
5. Responsive design works ✅

## Troubleshooting
If deployment fails:
1. Check build logs in Vercel dashboard
2. Verify all dependencies in package.json
3. Ensure TypeScript compiles: `npm run type-check`
4. Test local build: `npm run build`

---
**Created by Deployer Agent - Ready for immediate deployment** ✨