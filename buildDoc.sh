cp -r ./docs/src/.vuepress/public ../public
pnpm install 
pnpm run build
cd ./docs
pnpm install 
pnpm run docs:build
mv ./src/.vuepress/dist ../dist/docs