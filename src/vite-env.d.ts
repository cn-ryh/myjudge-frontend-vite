/// <reference types="vite/client" />
/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare interface Window {
    ipChecked: boolean;
    MathJax: {
        typeset: (element?: any[]) => void,
    }
}

declare let Mathjax
{
    function typesetPromise(eles:Element[]):Promise<any>
}