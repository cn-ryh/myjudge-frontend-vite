import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'
import vue from '@vitejs/plugin-vue'
import mpaPlugin from 'vite-plugin-mpa-plus'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import { glob } from 'glob';
import os from 'os';
import fsExtra from 'fs-extra';
const { writeFile } = fsExtra;
function creatEntry() {
    let nginxConf = ``;
    const entryObj: {
        [key: string]: {
            entry: string, template: string, filename: string
        }
    } = {};
    glob.sync('./src/pages/*/index.html').forEach(val => {

        const url = val.split(`pages${os.type() == `Linux` ? '/' : '\\'}`)[1].split((os.type() == `Linux`) ? '/' : '\\')[0];
        nginxConf +=
`location /${url == `index` ? `` : url} {
    index index.html;
    try_files $uri $uri/ /${url == `index` ? `` : url}/;
}\n`
        if (url == `index`) {
            entryObj[url] = {
                entry: `./src/pages/${url}/main.ts`,
                template: `./src/pages/${url}/index.html`,
                filename: `index.html`
            };
        }
        else {
            entryObj[url] = {
                entry: `./src/pages/${url}/main.ts`,
                template: `./src/pages/${url}/index.html`,
                filename: `${url}/index.html`
            };
        }
    });
    writeFile(`./nginx.conf`, nginxConf, "utf-8");
    return entryObj;
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), mpaPlugin({
        pages: creatEntry()
    }), Sitemap(), visualizer({ open: true })], resolve: {
        alias: {
            // 设置路径 这里resolve和join可自行选用
            '~': path.resolve(__dirname, './'),
            // 设置别名
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    build: {
        target: ['edge90', 'chrome90', 'firefox90', 'safari15']
    }
})
