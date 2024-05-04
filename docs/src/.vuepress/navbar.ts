import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    "/timeline/",
    {
        text: "指南",
        icon: "book",
        link: "/guide/"
    }
]);
