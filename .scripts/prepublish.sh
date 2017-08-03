#!/bin/bash

# IMPORTANT
# ---------
# This is an auto generated file with React CDK.
# Do not modify this file.
# Use `.scripts/user/prepublish.sh instead`.

echo "=> Running tests"
npm run test
echo "=> Finishing tests"

echo "=> Transpiling 'src' into ES5 ..."
echo ""
rm -rf ./dist
# .babelrc has all the plugins and presets used
NODE_ENV=production ./node_modules/.bin/babel --ignore tests,stories ./src --out-dir ./dist --no-comments
echo ""
echo "=> Transpiling completed."

. .scripts/user/prepublish.sh
