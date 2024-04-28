class IProblem {
    pid = ``
    title = ``
    author = `cn_ryh`
    difficult = 0
    TimeLimit = 1000
    MemoryLimit = 512
    description = ''
    descriptionmd = ''
    datanumber = 0;
    /**
     * @constructor
     */
    constructor() {

    }
}

class INetcut {
    paths: string = ``;
    value: string = ``;
    password: string = ``;
    creater: number = 0;
    createTime: number = 0;
    updateTime: number = 0;
    edit: boolean = false;
}


/**
 * 讨论类型
 * 
 * problem-题目相关
 * 
 * tool-工具链相关
 * 
 * workOrder-工单
 * 
 * language-各语言语法相关
 * 
 * firstExam-初赛相关
 * 
 * other-其他
 */
enum discussType {
    "problem" = "problem",
    "tool" = "tool",
    "workOrder" = "workOrder",
    "language" = "language",
    "firstExam" = "firstExam",
    "other" = "other"
}
/**
 * 讨论进度类型
 * 
 * `open`-开启的
 * 
 * `finish`-完成的
 *
 * `reject`-拒绝
 * 
 * `disable`-无法访问的
 */
enum processType {
    "open" = "open",
    "finish" = "finish",
    "reject" = "reject",
    "disable" = "disable"
}
class IReply {
    id: string = ``;
    parentId: string = ``;
    children: string[] = []
    sender: number = 0;
    sendTime: number = 0;
    value: string = ``
}

class IDiscussion {
    id: number = 0;
    title:string = ``;
    type: discussType = discussType.other;
    process: processType = processType.open;
    creater: number = 0;
    createTime: number = 0;
    replyTime: number = 0;
    replys: IReply[] = [];
    problem: string | null = null;
    value: string = ``
}


export { IProblem, IDiscussion, INetcut, IReply, discussType, processType }