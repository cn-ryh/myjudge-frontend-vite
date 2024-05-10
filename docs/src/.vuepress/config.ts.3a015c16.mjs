// src/.vuepress/config.ts
import { defineUserConfig } from "vuepress";

// src/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// src/.vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";
var navbar_default = navbar([
  "/",
  "/timeline/",
  {
    text: "\u6307\u5357",
    icon: "book",
    link: "/guide/"
  }
]);

// src/.vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";
var sidebar_default = sidebar({
  "/": [
    "",
    {
      text: "\u6307\u5357",
      icon: "laptop-code",
      prefix: "guide/",
      link: "guide/",
      children: [
        {
          text: `awa`,
          link: `training`,
          children: "structure"
        }
      ]
    }
  ]
});

// src/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://oj.cnryh.cn/docs",
  author: {
    name: "cn_ryh",
    url: "https://oj.cnryh.cn/user#/1"
  },
  iconAssets: "iconify",
  iconPrefix: "",
  logo: "logo.svg",
  docsDir: "src",
  // 导航栏
  navbar: navbar_default,
  // 侧边栏
  sidebar: sidebar_default,
  // 页脚
  footer: "",
  displayFooter: true,
  copyright: "Copyright &copy; cn_ryh 2024 all rights reserved",
  // 加密配置
  encrypt: {
    config: {}
  },
  // 多语言配置
  metaLocales: {
    editLink: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
  },
  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,
  // 在这里配置主题提供的插件
  plugins: {
    comment: {
      provider: "Waline",
      serverURL: "https://lenovo.cnryh.cn:38888/blog-comment/"
      // your server url
    },
    components: {
      components: ["Badge", "VPCard"]
    },
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      // 在启用之前安装 chart.js
      // chart: true,
      // insert component easily
      // 在启用之前安装 echarts
      // echarts: true,
      // 在启用之前安装 flowchart.ts
      flowchart: true,
      // gfm requires mathjax-full to provide tex support
      // gfm: true,
      // 在启用之前安装 katex
      // katex: true,
      // 在启用之前安装 mathjax-full
      mathjax: true
      // 在启用之前安装 mermaid
      // mermaid: true,
      // playground: {
      //   presets: ["ts", "vue"],
      // },
      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
      // 在启用之前安装 @vue/repl
      // vuePlayground: true,
      // install sandpack-vue3 before enabling it
      // sandpack: true,
    }
    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
});

// src/.vuepress/config.ts
var config_default = defineUserConfig({
  base: "/docs/",
  lang: "zh-CN",
  title: "11 Online Judge Document",
  description: "11 Online Judge \u6587\u6863",
  theme: theme_default
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOi9teWp1ZGdlLWZyb250ZW5kLXZpdGUvZG9jcy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteWp1ZGdlLWZyb250ZW5kLXZpdGVcXFxcZG9jc1xcXFxzcmNcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXlqdWRnZS1mcm9udGVuZC12aXRlL2RvY3Mvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSBcInZ1ZXByZXNzXCI7XG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gICAgYmFzZTogXCIvZG9jcy9cIixcbiAgICBsYW5nOiBcInpoLUNOXCIsXG4gICAgdGl0bGU6IFwiMTEgT25saW5lIEp1ZGdlIERvY3VtZW50XCIsXG4gICAgZGVzY3JpcHRpb246IFwiMTEgT25saW5lIEp1ZGdlIFx1NjU4N1x1Njg2M1wiLFxuICAgIHRoZW1lLFxuICAgIC8vIFx1NTQ4QyBQV0EgXHU0RTAwXHU4RDc3XHU1NDJGXHU3NTI4XG4gICAgLy8gc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L215anVkZ2UtZnJvbnRlbmQtdml0ZS9kb2NzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15anVkZ2UtZnJvbnRlbmQtdml0ZVxcXFxkb2NzXFxcXHNyY1xcXFwudnVlcHJlc3NcXFxcdGhlbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215anVkZ2UtZnJvbnRlbmQtdml0ZS9kb2NzL3NyYy8udnVlcHJlc3MvdGhlbWUudHNcIjtpbXBvcnQgeyBob3BlVGhlbWUgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuaW1wb3J0IG5hdmJhciBmcm9tIFwiLi9uYXZiYXIuanNcIjtcbmltcG9ydCBzaWRlYmFyIGZyb20gXCIuL3NpZGViYXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgaG9wZVRoZW1lKHtcbiAgICBob3N0bmFtZTogXCJodHRwczovL29qLmNucnloLmNuL2RvY3NcIixcblxuICAgIGF1dGhvcjoge1xuICAgICAgICBuYW1lOiBcImNuX3J5aFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9vai5jbnJ5aC5jbi91c2VyIy8xXCIsXG4gICAgfSxcblxuICAgIGljb25Bc3NldHM6IFwiaWNvbmlmeVwiLFxuICAgIGljb25QcmVmaXg6IFwiXCIsXG5cbiAgICBsb2dvOiBcImxvZ28uc3ZnXCIsXG4gICAgZG9jc0RpcjogXCJzcmNcIixcbiAgICAvLyBcdTVCRkNcdTgyMkFcdTY4MEZcbiAgICBuYXZiYXIsXG4gICAgLy8gXHU0RkE3XHU4RkI5XHU2ODBGXG4gICAgc2lkZWJhcixcbiAgICAvLyBcdTk4NzVcdTgxMUFcbiAgICBmb290ZXI6IFwiXCIsXG4gICAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcbiAgICBjb3B5cmlnaHQ6IFwiQ29weXJpZ2h0ICZjb3B5OyBjbl9yeWggMjAyNCBhbGwgcmlnaHRzIHJlc2VydmVkXCIsXG4gICAgLy8gXHU1MkEwXHU1QkM2XHU5MTREXHU3RjZFXG4gICAgZW5jcnlwdDoge1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gXHU1OTFBXHU4QkVEXHU4QTAwXHU5MTREXHU3RjZFXG4gICAgbWV0YUxvY2FsZXM6IHtcbiAgICAgICAgZWRpdExpbms6IFwiXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzVcIixcbiAgICB9LFxuXG4gICAgLy8gXHU1OTgyXHU2NzlDXHU2MEYzXHU4OTgxXHU1QjlFXHU2NUY2XHU2N0U1XHU3NzBCXHU0RUZCXHU0RjU1XHU2NTM5XHU1M0Q4XHVGRjBDXHU1NDJGXHU3NTI4XHU1QjgzXHUzMDAyXHU2Q0U4OiBcdThGRDlcdTVCRjlcdTY2RjRcdTY1QjBcdTYwMjdcdTgwRkRcdTY3MDlcdTVGODhcdTU5MjdcdThEMUZcdTk3NjJcdTVGNzFcdTU0Q0RcbiAgICAvLyBob3RSZWxvYWQ6IHRydWUsXG5cbiAgICAvLyBcdTU3MjhcdThGRDlcdTkxQ0NcdTkxNERcdTdGNkVcdTRFM0JcdTk4OThcdTYzRDBcdTRGOUJcdTc2ODRcdTYzRDJcdTRFRjZcbiAgICBwbHVnaW5zOiB7XG4gICAgICAgIGNvbW1lbnQ6IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiBcIldhbGluZVwiLFxuICAgICAgICAgICAgc2VydmVyVVJMOiBcImh0dHBzOi8vbGVub3ZvLmNucnloLmNuOjM4ODg4L2Jsb2ctY29tbWVudC9cIiwgLy8geW91ciBzZXJ2ZXIgdXJsXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgY29tcG9uZW50czogW1wiQmFkZ2VcIiwgXCJWUENhcmRcIl0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWRFbmhhbmNlOiB7XG4gICAgICAgICAgICBhbGlnbjogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJzOiB0cnVlLFxuICAgICAgICAgICAgY29kZXRhYnM6IHRydWUsXG4gICAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICAgICAgICBkZW1vOiB0cnVlLFxuICAgICAgICAgICAgZmlndXJlOiB0cnVlLFxuICAgICAgICAgICAgaW1nTGF6eWxvYWQ6IHRydWUsXG4gICAgICAgICAgICBpbWdTaXplOiB0cnVlLFxuICAgICAgICAgICAgaW5jbHVkZTogdHJ1ZSxcbiAgICAgICAgICAgIG1hcms6IHRydWUsXG4gICAgICAgICAgICBzdHlsaXplOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVyOiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRpcFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUmVjb21tZW5kZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3ViOiB0cnVlLFxuICAgICAgICAgICAgc3VwOiB0cnVlLFxuICAgICAgICAgICAgdGFiczogdHJ1ZSxcbiAgICAgICAgICAgIHRhc2tsaXN0OiB0cnVlLFxuXG4gICAgICAgICAgICAvLyBcdTU3MjhcdTU0MkZcdTc1MjhcdTRFNEJcdTUyNERcdTVCODlcdTg4QzUgY2hhcnQuanNcbiAgICAgICAgICAgIC8vIGNoYXJ0OiB0cnVlLFxuXG4gICAgICAgICAgICAvLyBpbnNlcnQgY29tcG9uZW50IGVhc2lseVxuXG4gICAgICAgICAgICAvLyBcdTU3MjhcdTU0MkZcdTc1MjhcdTRFNEJcdTUyNERcdTVCODlcdTg4QzUgZWNoYXJ0c1xuICAgICAgICAgICAgLy8gZWNoYXJ0czogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IGZsb3djaGFydC50c1xuICAgICAgICAgICAgZmxvd2NoYXJ0OiB0cnVlLFxuXG4gICAgICAgICAgICAvLyBnZm0gcmVxdWlyZXMgbWF0aGpheC1mdWxsIHRvIHByb3ZpZGUgdGV4IHN1cHBvcnRcbiAgICAgICAgICAgIC8vIGdmbTogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IGthdGV4XG4gICAgICAgICAgICAvLyBrYXRleDogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IG1hdGhqYXgtZnVsbFxuICAgICAgICAgICAgbWF0aGpheDogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IG1lcm1haWRcbiAgICAgICAgICAgIC8vIG1lcm1haWQ6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIHBsYXlncm91bmQ6IHtcbiAgICAgICAgICAgIC8vICAgcHJlc2V0czogW1widHNcIiwgXCJ2dWVcIl0sXG4gICAgICAgICAgICAvLyB9LFxuXG4gICAgICAgICAgICAvLyBcdTU3MjhcdTU0MkZcdTc1MjhcdTRFNEJcdTUyNERcdTVCODlcdTg4QzUgcmV2ZWFsLmpzXG4gICAgICAgICAgICAvLyByZXZlYWxKczoge1xuICAgICAgICAgICAgLy8gICBwbHVnaW5zOiBbXCJoaWdobGlnaHRcIiwgXCJtYXRoXCIsIFwic2VhcmNoXCIsIFwibm90ZXNcIiwgXCJ6b29tXCJdLFxuICAgICAgICAgICAgLy8gfSxcblxuICAgICAgICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IEB2dWUvcmVwbFxuICAgICAgICAgICAgLy8gdnVlUGxheWdyb3VuZDogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gaW5zdGFsbCBzYW5kcGFjay12dWUzIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgICAgICAgLy8gc2FuZHBhY2s6IHRydWUsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU0RjYwXHU5NzAwXHU4OTgxIFBXQVx1MzAwMlx1NUI4OVx1ODhDNSBAdnVlcHJlc3MvcGx1Z2luLXB3YSBcdTVFNzZcdTUzRDZcdTZEODhcdTRFMEJcdTY1QjlcdTZDRThcdTkxQ0FcbiAgICAgICAgLy8gcHdhOiB7XG4gICAgICAgIC8vICAgZmF2aWNvbjogXCIvZmF2aWNvbi5pY29cIixcbiAgICAgICAgLy8gICBjYWNoZUhUTUw6IHRydWUsXG4gICAgICAgIC8vICAgY2FjaGVJbWFnZTogdHJ1ZSxcbiAgICAgICAgLy8gICBhcHBlbmRCYXNlOiB0cnVlLFxuICAgICAgICAvLyAgIGFwcGxlOiB7XG4gICAgICAgIC8vICAgICBpY29uOiBcIi9hc3NldHMvaWNvbi9hcHBsZS1pY29uLTE1Mi5wbmdcIixcbiAgICAgICAgLy8gICAgIHN0YXR1c0JhckNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIC8vICAgfSxcbiAgICAgICAgLy8gICBtc1RpbGU6IHtcbiAgICAgICAgLy8gICAgIGltYWdlOiBcIi9hc3NldHMvaWNvbi9tcy1pY29uLTE0NC5wbmdcIixcbiAgICAgICAgLy8gICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgLy8gICB9LFxuICAgICAgICAvLyAgIG1hbmlmZXN0OiB7XG4gICAgICAgIC8vICAgICBpY29uczogW1xuICAgICAgICAvLyAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay01MTIucG5nXCIsXG4gICAgICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAvLyAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAvLyAgICAgICB9LFxuICAgICAgICAvLyAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay0xOTIucG5nXCIsXG4gICAgICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAvLyAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAvLyAgICAgICB9LFxuICAgICAgICAvLyAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtNTEyLnBuZ1wiLFxuICAgICAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAvLyAgICAgICB9LFxuICAgICAgICAvLyAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtMTkyLnBuZ1wiLFxuICAgICAgICAvLyAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAvLyAgICAgICB9LFxuICAgICAgICAvLyAgICAgXSxcbiAgICAgICAgLy8gICAgIHNob3J0Y3V0czogW1xuICAgICAgICAvLyAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgbmFtZTogXCJEZW1vXCIsXG4gICAgICAgIC8vICAgICAgICAgc2hvcnRfbmFtZTogXCJEZW1vXCIsXG4gICAgICAgIC8vICAgICAgICAgdXJsOiBcIi9kZW1vL1wiLFxuICAgICAgICAvLyAgICAgICAgIGljb25zOiBbXG4gICAgICAgIC8vICAgICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vZ3VpZGUtbWFza2FibGUucG5nXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgICAgICAvLyAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAvLyAgICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICBdLFxuICAgICAgICAvLyAgICAgICB9LFxuICAgICAgICAvLyAgICAgXSxcbiAgICAgICAgLy8gICB9LFxuICAgICAgICAvLyB9LFxuICAgIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovbXlqdWRnZS1mcm9udGVuZC12aXRlL2RvY3Mvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXlqdWRnZS1mcm9udGVuZC12aXRlXFxcXGRvY3NcXFxcc3JjXFxcXC52dWVwcmVzc1xcXFxuYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215anVkZ2UtZnJvbnRlbmQtdml0ZS9kb2NzL3NyYy8udnVlcHJlc3MvbmF2YmFyLnRzXCI7aW1wb3J0IHsgbmF2YmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgbmF2YmFyKFtcbiAgICBcIi9cIixcbiAgICBcIi90aW1lbGluZS9cIixcbiAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU2MzA3XHU1MzU3XCIsXG4gICAgICAgIGljb246IFwiYm9va1wiLFxuICAgICAgICBsaW5rOiBcIi9ndWlkZS9cIlxuICAgIH1cbl0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOi9teWp1ZGdlLWZyb250ZW5kLXZpdGUvZG9jcy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteWp1ZGdlLWZyb250ZW5kLXZpdGVcXFxcZG9jc1xcXFxzcmNcXFxcLnZ1ZXByZXNzXFxcXHNpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215anVkZ2UtZnJvbnRlbmQtdml0ZS9kb2NzL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBzaWRlYmFyKHtcbiAgICBcIi9cIjogW1xuICAgICAgICBcIlwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NjMwN1x1NTM1N1wiLFxuICAgICAgICAgICAgaWNvbjogXCJsYXB0b3AtY29kZVwiLFxuICAgICAgICAgICAgcHJlZml4OiBcImd1aWRlL1wiLFxuICAgICAgICAgICAgbGluazogXCJndWlkZS9cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgYXdhYCxcbiAgICAgICAgICAgICAgICAgICAgbGluazogYHRyYWluaW5nYCxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1MsU0FBUyx3QkFBd0I7OztBQ0FuQyxTQUFTLGlCQUFpQjs7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
