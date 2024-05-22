import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'
import vue from '@vitejs/plugin-vue'
import mpaPlugin from 'vite-plugin-mpa-plus'
import path from 'path'
import { glob } from 'glob';
import os from 'os';
function creatEntry() {
    const entryObj: {
        [key: string]: {
            entry: string, template: string, filename: string
        }
    } = {};
    glob.sync('./src/pages/*/index.html').forEach(val => {
        const url = val.split(`pages${os.type() == `Linux` ? '/' : '\\'}`)[1].split((os.type() == `Linux` )? '/' : '\\')[0];
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
    return entryObj;
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), mpaPlugin({
        pages: creatEntry()
    }), Sitemap()], resolve: {
        alias: {
            // 设置路径 这里resolve和join可自行选用
            '~': path.resolve(__dirname, './'),
            // 设置别名
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
})
