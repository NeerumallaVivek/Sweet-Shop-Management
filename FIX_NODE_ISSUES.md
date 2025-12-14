# 🔧 Fix Node.js and Vite Issues

## Problem 1: Node.js Version Too Old

**Current Version:** 20.17.0  
**Required:** 20.19+ or 22.12+  
**Error:** "Vite requires Node.js version 20.19+ or 22"

### Solution: Upgrade Node.js

#### Option 1: Download Latest LTS Version (Recommended)
1. Go to https://nodejs.org/
2. Download **LTS version** (should be 22.x or newer)
3. Run the installer
4. Restart your terminal/VS Code
5. Verify: `node --version` (should show 22.x or higher)

#### Option 2: Use NVM (Node Version Manager)
If you have NVM installed:
```bash
nvm install 22
nvm use 22
node --version
```

---

## Problem 2: Permission Error

**Error:** `EPERM: operation not permitted, rmdir 'C:\Users\VIVEK\OneDrive\Desktop\Documents\Incubyte\Frontend\node_modules\.vite\deps'`

This happens because:
- OneDrive is syncing the folder
- VS Code or another process has files locked
- Vite cache is corrupted

### Solution: Clean Vite Cache

Try these steps **in order**:

#### Step 1: Close Everything
1. Close VS Code completely
2. Stop any running npm processes
3. Wait 10 seconds for OneDrive to finish syncing

#### Step 2: Delete Vite Cache Manually
```powershell
# Navigate to Frontend folder
cd C:\Users\VIVEK\OneDrive\Desktop\Documents\Incubyte\Frontend

# Remove node_modules\.vite folder
Remove-Item -Recurse -Force .\node_modules\.vite -ErrorAction SilentlyContinue

# Remove package-lock.json
Remove-Item package-lock.json -ErrorAction SilentlyContinue
```

#### Step 3: Reinstall Dependencies
```powershell
npm install
```

#### Step 4: Start Dev Server
```powershell
npm run dev
```

---

## Alternative: Move Project Out of OneDrive

**Best Solution:** OneDrive can cause issues with node_modules.

Move your project to a local folder:

```powershell
# Move entire project
Move-Item "C:\Users\VIVEK\OneDrive\Desktop\Documents\Incubyte" "C:\Projects\Incubyte"

# Navigate to new location
cd C:\Projects\Incubyte\Frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## Quick Fix (If Above Doesn't Work)

1. **Restart your computer** to release all file locks
2. **Pause OneDrive sync** temporarily
3. **Run as Administrator:**
   - Right-click PowerShell → "Run as Administrator"
   - Navigate to Frontend folder
   - Run: `Remove-Item -Recurse -Force .\node_modules\.vite`
   - Then: `npm run dev`

---

## After Fixing Node.js Version

Once you upgrade to Node.js 22+:

```bash
# Verify version
node --version  # Should show v22.x.x or higher

# Clean install
cd C:\Users\VIVEK\OneDrive\Desktop\Documents\Incubyte\Frontend
rm -rf node_modules package-lock.json
npm install

# Start dev server
npm run dev
```

Your React app should start successfully on http://localhost:5173

---

## Summary

**Priority Steps:**

1. ✅ **Upgrade Node.js to version 22+** (from nodejs.org)
2. ✅ **Restart VS Code and terminal**
3. ✅ **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. ✅ **Run dev server:**
   ```bash
   npm run dev
   ```

**Optional but Recommended:**
- Move project out of OneDrive to avoid permission issues

---

Let me know once you've upgraded Node.js and I'll help you verify everything works!
