<script setup lang="ts">
import { getCookie } from '@/modules/cookie';
import { ip } from '@/modules/ip';
import { Notification, Table, TableColumn } from '@arco-design/web-vue';
import { Link, Button, Popconfirm } from 'tdesign-vue-next';
import axios from 'axios';
import { Ref, ref } from 'vue';
import { currectUser } from '@/modules/user/currectUser';
import { INetcut } from '@/modules/interface';
const netcutList: Ref<INetcut[]> = ref([]);
if (!getCookie(`uid`) || !getCookie(`token`)) {
    Notification.error(`用户未登录`)
}
else {
    axios({
        method: `post`,
        url: `${ip}/getOwnNetcutList`,
        data: {
            uid: +getCookie(`uid`),
            token: getCookie(`token`)
        }
    }).then((res) => {
        netcutList.value = res.data.data;
    })

}
function deleteNetcut(path: string) {
    axios.post(`${ip}/removeNetcut`, {
        paths: path,
        uid: currectUser.uid,
        token: currectUser.token
    }).then((removeRes) => {
        if (removeRes.data.code === 0) {
            Notification.success(`删除成功`);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        else {
            Notification.warning(`删除失败，请查看日志`);
            console.error(removeRes.data.error);
        }
    }).catch((err) => {
        Notification.error(`删除失败，请查看日志`);
        console.error(err);
    })
}
</script>
<template>
    <div>
        <H2 style="text-align: center;">我的剪切板</H2>
        <Table :pagination="{ pageSize: 20 }" :data="netcutList" size="small" :bordered="false"
            style="width: 80vw;margin-left: 10vw;">
            <template #columns>
                <TableColumn title="剪切板路径" data-index="paths">
                    <template #cell="{ record }">
                        <Link :href="`/netcut#/${record.paths}`">
                        {{ record.paths }}
                        </Link>
                    </template>
                </TableColumn>
                <TableColumn title="创建时间" data-index="paths">
                    <template #cell="{ record }">
                        <span style="font-weight: 800;">
                            {{ (new Date(record.createTime)).toLocaleString() }}
                        </span>
                    </template>
                </TableColumn>
                <TableColumn title="修改时间" data-index="paths">
                    <template #cell="{ record }">
                        <span style="font-weight: 800;">
                            {{ (new Date(record.updateTime)).toLocaleString() }}
                        </span>
                    </template>
                </TableColumn>
                <TableColumn title="操作" data-index="">
                    <template #cell="{ record }">
                        <Popconfirm content="确认删除剪切板吗" @confirm="deleteNetcut(record.paths)">
                            <Button theme="primary">删除</Button>
                        </Popconfirm>
                    </template>
                </TableColumn>
            </template>
        </Table>
        <br>
        <center>
            <div style="color: blue;font-size: small;">
                <p>如果你想创建一个剪切板，可以访问：https://oj.cnryh.cn/netcut#/剪切板路径</p>
                <p>在没有相同路径的剪切板时，你会顺利地新建你的剪切板。</p>
                <p>剪切板有一些保留关键路径，可以参考 <a href="/netcutPrivate.txt" style="color: red;">这里</a>，如果你使用保留关键字，剪切板可能随时被删除。</p>
            </div>

            <div style="color: red;font-size: small;">
                <p>虽然在传输上使用了 https 协议，并且开启了密码保护，但数据仍有一定泄露风险</p>
                <p>因此不建议使用该剪切板保存隐私数据</p>
            </div>
        </center>
    </div>
</template>

<style></style>