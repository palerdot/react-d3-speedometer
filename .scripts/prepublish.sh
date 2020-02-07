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
npm run try-build

echo ""
echo "copying typescript definition file (index.d.ts)"
cp ./src/index.d.ts ./dist/
echo "copied !!! typescript definition file (index.d.ts)"

echo ""
echo "=> Transpiling completed."

. .scripts/user/prepublish.sh
