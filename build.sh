echo "Cleaning up old files"
rm -rf dist extension
echo "Building source files"
NODE_ENV="production" npm run type-check && npm run build-app || exit 1
echo "Creating extension directory"
mkdir extension
cp -R dist/. extension/
cp manifest.json extension/
cp -R icons/. extension/
echo "Done"
