import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
    base: "/docs/",
    lang: "zh-CN",
    title: "11 Online Judge Document",
    description: "11 Online Judge 文档",
    theme,
    // 和 PWA 一起启用
    // shouldPrefetch: false,
});
