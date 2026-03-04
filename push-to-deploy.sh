#!/bin/bash
# Run this in your Mac Terminal to push and deploy (e.g. after confirming changes).
# Your Terminal can use stored GitHub credentials; Cursor's terminal often cannot.
set -e
cd "$(dirname "$0")"
git add -A
if [[ -n $(git status -s) ]]; then
  git commit -m "Update: confirm changes for deployment"
fi
git push
echo "Pushed. Your site should update in 1–2 minutes."
