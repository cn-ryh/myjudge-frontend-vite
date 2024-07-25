import MarkdownIt from "markdown-it";
import { align } from "@mdit/plugin-align";
import { tab } from "@mdit/plugin-tab";
import { mark } from "@mdit/plugin-mark";
import { tasklist } from "@mdit/plugin-tasklist";
import { container } from "@mdit/plugin-container"
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-light.min.css'
import './style.css'
const markdownit = new MarkdownIt({
    html: true, highlight: function (str, lang) {
        if (!lang) {
            lang = `cmd`
        }
        if (lang && highlight.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    highlight.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) { return str }
        }
        else {
            return str;
        }
    }
}).use(align).use(tab).use(tasklist).use(mark).use(container, {
    name: "hint",
    openRender: (tokens, index) => {
        const info = tokens[index].info.trim().slice(4).trim();
        return `<div class="custom-container hint">\n<p class="hint-container-title">${info || "Hint"
            }</p>\n`;
    },
}).use(container, {
    name: "warning",
    openRender: (tokens, index) => {
        const info = tokens[index].info.trim().slice(7).trim();
        return `<div class="hint-container warning">\n<p class="hint-container-title">${info || "Warning"
            }</p>\n`;
    },
}).use(container, {
    name: "info",
    openRender: (tokens, index) => {
        const info = tokens[index].info.trim().slice(4).trim();
        return `<div class="hint-container info">\n<p class="hint-container-title">${info || "Info"
            }</p>\n`;
    },
}).use(container, {
    name: "note",
    openRender: (tokens, index) => {
        const info = tokens[index].info.trim().slice(4).trim();
        return `<div class="hint-container note">\n<p class="hint-container-title">${info || "Note"
            }</p>\n`;
    },
}).use(container, {
    name: "tip",
    openRender: (tokens, index) => {
        const info = tokens[index].info.trim().slice(3).trim();
        return `<div class="hint-container tip">\n<p class="hint-container-title">${info || "Tip"
            }</p>\n`;
    },
}).use(container, {
    name: "caution",
    openRender: (tokens, index) => {
        const info = tokens[index].info.trim().slice(7).trim();
        return `<div class="hint-container caution">\n<p class="hint-container-title">${info || "Caution"
            }</p>\n`;
    },
}).use(container, {
    name: "important",
    openRender: (tokens, index) => {
        const info = tokens[index].info.trim().slice(9).trim();
        return `<div class="hint-container important">\n<p class="hint-container-title">${info || "Important"
            }</p>\n`;
    }
});
function render(value: string, timer: number = 200, renderBlock?: any[]) {
    const res = markdownit.render(value);
    const realRenderBlock:Element[] = [];
    for(let now of renderBlock??[])
    {
        if(typeof now === `string`)
        {
            const elem = document.querySelector(now);
            if(elem)
            {
                realRenderBlock.push(elem);
            }
            else
            {
                console.log(`null`)
            }
        }
        else
        {
            realRenderBlock.push(now as Element);
        }
    }
    setTimeout(() => {
        window.MathJax.typeset(realRenderBlock);
    }, timer)
    return res;
}
export { markdownit, render }