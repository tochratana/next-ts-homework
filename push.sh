#!/bin/bash

# Stop script if any command fails
set -e

BRANCH="main"
REMOTE="origin"
MESSAGE="auto commit $(date '+%Y-%m-%d %H:%M:%S')"

echo "🔄 Checking git status..."

# Check if this is a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not a git repository"
  exit 1
fi

# Check for changes
if git diff --quiet && git diff --cached --quiet; then
  echo "✅ No changes to commit"
  exit 0
fi

echo "➕ Adding changes..."
git add .

echo "📝 Committing..."
git commit -m "$MESSAGE"

echo "🚀 Pushing to $REMOTE $BRANCH..."
git push $REMOTE $BRANCH

echo "🎉 Auto push completed successfully!"
