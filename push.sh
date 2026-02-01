#!/bin/bash

set -e


git config --global user.email "rml.cambo14@gmail.com"
git config --global user.name "tochratanadev"

BRANCH="main"
REMOTE="origin"

# Ask for commit message
read -p "Enter commit message: " MESSAGE

# Check empty message
if [ -z "$MESSAGE" ]; then
  echo "Commit message cannot be empty"
  exit 1
fi

echo "Checking git repository..."

# Ensure git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo " Not a git repository"
  exit 1
fi

# Check for changes
if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to commit"
  exit 0
fi

echo "Adding changes..."
git add .

echo "Committing..."
git commit -m "$MESSAGE"

echo "Pushing to $REMOTE $BRANCH..."
git push $REMOTE $BRANCH

echo "Auto push completed!"
