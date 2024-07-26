import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/": [
        {
            text: "时间线",
            icon: "laptop-code",
            prefix: "timeline/",
            link: "timeline/",
            children: [
            ],
        },
        {
            text: "指南",
            icon: "laptop-code",
            prefix: "guide/",
            link: "guide/",
            children: [
                {
                    text: `用户相关`,
                    link: `user`,
                    children: "structure"
                },
                {
                    text: `题目相关`,
                    link: `problem`,
                    children: "structure"
                },
                {
                    text: `题单相关`,
                    link: `training`,
                    children: "structure"
                }
            ],
        },
    ],
});
