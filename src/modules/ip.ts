import axios from "axios";
import { NotifyPlugin } from 'tdesign-vue-next'
const local_ip = `https://oj.local.cnryh.cn`
const frp_ip = `https://oj.school.frp.cnryh.cn`
const remote_ip = `https://oj.server.cnryh.cn`
let ip = local_ip;
let failTime = 0;
const x = localStorage.getItem(`ip`);
if (x == remote_ip || x == frp_ip) {
    ip = x;
}
async function checkConnection(url: string): Promise<Boolean> {
    try {
        await axios.get(url, {
            timeout: 15000
        })
        return true;
    }
    catch (err) {
        return false
    }
}
const checkip = async () => {
    checkConnection(``);
    if (failTime >= 15) {
        NotifyPlugin.error({
            title: `错误次数过多`,
            content: `将使用云服务器保持通信，如需切换请手动刷新`
        })
        ip = remote_ip;
        clearInterval(timer);
    }
    // 当前是本地通信
    if (ip == local_ip) {
        try {
            // 连接本地通信
            await axios.get(ip, {
                timeout: 15000
            });
            localStorage.setItem(`ip`, local_ip);
        } catch (err) {
            console.error(err);
            NotifyPlugin.warning({
                title: `内网地址访问失败`,
                content: `正在切换至穿透服务器通信`
            })
            ++failTime;
            localStorage.setItem(`ip`, frp_ip);
            ip = frp_ip;
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }
    // 当前通过穿透服务器通信
    else if (ip == frp_ip) {
        try {
            // 尝试恢复本地通信
            const data = await axios.get(local_ip, {
                timeout: 15000
            });
            if (data.data.length >= 5) {
                NotifyPlugin.success({
                    title: `成功连通内网`,
                    content: `正在切换至内网服务器`
                })
                localStorage.setItem(`ip`, local_ip);
                ip = local_ip;
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (err) {
            try {
                // 监测通信是否正常
                await axios.get(frp_ip, {
                    timeout: 15000
                });
            } catch (err) {
                console.error(err);
                NotifyPlugin.warning({
                    title: `穿透服务器访问失败`,
                    content: `正在切换至云服务器通信`
                })
                localStorage.setItem(`ip`, remote_ip);
                ip = remote_ip;
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }
    }
    // 当前是云服务器
    else {
        try {
            // 尝试恢复本地通信
            const data = await axios.get(local_ip, {
                timeout: 15000
            });
            if (data.data.length >= 5) {
                NotifyPlugin.success({
                    title: `成功连通内网`,
                    content: `正在切换至内网服务器`
                })
                localStorage.setItem(`ip`, local_ip);
                ip = local_ip;
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (err) {
            // 尝试恢复穿透通信
            const data = await axios.get(frp_ip, {
                timeout: 15000
            });
            if (data.data.length >= 5) {
                NotifyPlugin.success({
                    title: `成功连通穿透服务器`,
                    content: `正在切换至穿透服务器`
                })
                localStorage.setItem(`ip`, frp_ip);
                ip = frp_ip;
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }
    }
}
checkip();
const timer = setInterval(checkip, 60000)
export { ip };