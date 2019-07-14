rm -rf dist extension
npx vue-cli-service build
mkdir extension
cp -R dist/. extension/
cp manifest.json extension/
