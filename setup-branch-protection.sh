#!/bin/bash

# Branch Protection Setup Guide
# Run this script after pushing your code to set up branch protection

echo "🔒 Setting up branch protection for main branch..."
echo ""
echo "To complete the setup, go to your GitHub repository and:"
echo "1. Navigate to Settings > Branches"
echo "2. Click 'Add rule' for branch name pattern: main"
echo "3. Enable the following options:"
echo "   ✓ Require a pull request before merging"
echo "   ✓ Require status checks to pass before merging"
echo "   ✓ Require branches to be up to date before merging"
echo "   ✓ Require status checks: 'build' (from CI workflow)"
echo "   ✓ Restrict pushes that create files larger than 100MB"
echo "4. Click 'Create'"
echo ""
echo "This will ensure that:"
echo "- All changes go through pull requests"
echo "- CI builds must pass before merging"
echo "- No direct pushes to main branch"
