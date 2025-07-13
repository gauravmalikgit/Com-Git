#!/bin/bash

# Transfer AI-Powered Push Notification Generator to GitHub
# This script will initialize git and push the code to the specified repository

echo "🚀 Transferring AI-Powered Push Notification Generator to GitHub..."
echo "=================================================================="

# Repository URL
REPO_URL="https://github.com/gauravmalikgit/AI-Push-Notification-Generator-.git"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Visit: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is available"

# Check if we're already in a git repository
if [ -d ".git" ]; then
    echo "⚠️  This directory is already a git repository."
    echo "Do you want to continue? This will reset the git history. (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Transfer cancelled."
        exit 1
    fi
    rm -rf .git
fi

# Initialize git repository
echo "📦 Initializing git repository..."
git init

# Add .gitignore first
git add .gitignore

# Check for sensitive files
echo "🔍 Checking for sensitive files..."
if [ -f "backend/.env" ]; then
    echo "⚠️  Found backend/.env file. This contains sensitive information."
    echo "This file will be excluded from git (it's in .gitignore)."
fi

if [ -d "backend/node_modules" ]; then
    echo "⚠️  Found node_modules directories. These will be excluded from git."
fi

# Add all files (excluding those in .gitignore)
echo "📁 Adding all project files..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: AI-Powered Push Notification Generator

Features:
- 🔐 JWT-based user authentication
- 🧠 AI-powered push notification generation with OpenAI GPT-4
- 📊 PostgreSQL database with Prisma ORM
- 📈 Adaptive learning system per user
- 🎨 Modern Next.js frontend with Tailwind CSS
- 📁 CSV/Excel file upload and processing
- 📊 Analytics dashboard with performance metrics
- 🔒 Comprehensive security implementation
- 🚀 Production-ready architecture

Tech Stack:
- Backend: Node.js, Express, TypeScript, PostgreSQL, Prisma
- Frontend: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- AI: OpenAI GPT-4 for intelligent content generation
- Authentication: JWT with bcrypt password hashing
- Deployment: Ready for production with Docker support"

# Add remote repository
echo "🌐 Adding remote repository..."
git remote add origin "$REPO_URL"

# Check if the repository exists and is accessible
echo "🔗 Checking repository accessibility..."
if git ls-remote "$REPO_URL" &> /dev/null; then
    echo "✅ Repository is accessible"
else
    echo "❌ Cannot access repository. Please check:"
    echo "   1. The repository URL is correct"
    echo "   2. You have access permissions to the repository"
    echo "   3. You are logged in to GitHub (git config --global user.name)"
    echo ""
    echo "Repository URL: $REPO_URL"
    exit 1
fi

# Push to GitHub
echo "🚀 Pushing code to GitHub..."
echo "Note: If this is the first push, it may take a moment..."

if git push -u origin main; then
    echo ""
    echo "🎉 SUCCESS! Code has been transferred to GitHub!"
    echo "================================================"
    echo ""
    echo "Repository URL: $REPO_URL"
    echo ""
    echo "Next steps:"
    echo "1. Visit the repository on GitHub to verify the upload"
    echo "2. Update the repository README if needed"
    echo "3. Set up GitHub Actions for CI/CD (optional)"
    echo "4. Configure deployment settings"
    echo ""
    echo "🔧 Setup Instructions:"
    echo "1. Clone the repository: git clone $REPO_URL"
    echo "2. Follow the setup instructions in README.md"
    echo "3. Configure environment variables"
    echo "4. Run: ./setup.sh"
    echo ""
else
    echo ""
    echo "❌ Failed to push to GitHub."
    echo ""
    echo "Common solutions:"
    echo "1. Check your GitHub credentials:"
    echo "   git config --global user.name \"Your Name\""
    echo "   git config --global user.email \"your.email@example.com\""
    echo ""
    echo "2. If using HTTPS, you may need a personal access token:"
    echo "   Visit: https://github.com/settings/tokens"
    echo ""
    echo "3. If using SSH, check your SSH keys:"
    echo "   ssh -T git@github.com"
    echo ""
    echo "4. Try pushing manually:"
    echo "   git push -u origin main"
    echo ""
    exit 1
fi

echo ""
echo "📚 Documentation included:"
echo "- README.md: Complete setup and usage instructions"
echo "- PROJECT_SUMMARY.md: Detailed project overview and features"
echo "- setup.sh: Quick setup script for development environment"
echo ""
echo "🎯 The repository now contains a complete, production-ready"
echo "   AI-powered Push Notification Generator application!"