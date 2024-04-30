import axios from "axios";
import { ip } from "@/modules/ip";
import { currectUser } from "./currectUser";
export class UserLoginData {
    uid = 0;
    username = ``
    logined = false;
    admin: AdminType = new AdminType();
    token = ``;
    constructor(uid = 0, logined = false, username = ``, admin = new AdminType(), token = ``) {
        this.uid = uid;
        this.logined = logined;
        this.admin = admin;
        this.token = token;
        this.username = username;
    }
}
export class UserPublicData {
    uid = 0;
    username = ``
    tag: { color: string, text: string, textcolor: string }[] = [];
    constructor(uid = 0, username = ``, tag = []) {
        this.uid = uid;
        this.username = username;
        this.tag = tag;
    }
}
export class AdminType {
    All: boolean;
    user: boolean;
    problem: boolean;
    chat: boolean;
    training: boolean;
    contest: boolean;
    discuss: boolean;
    netcut: boolean;
    record: boolean;
    constructor() {
        this.All = false;
        this.user = this.problem = this.chat = this.training = false;
        this.contest = this.discuss = this.netcut = this.record = false;
    }
}
/**
 * 
 * @returns {Promise<UserLoginData>}
 */
function keepLogin(): Promise<UserLoginData> {
    return new Promise((resolve) => {
        const uid = currectUser.uid;
        const usertoken = currectUser.token;
        if (!uid || !usertoken) {
            resolve(new UserLoginData());
            return;
        }
        if (usertoken === ``) {
            resolve(new UserLoginData());
        }
        axios.post(`${ip}/keepLogin`, {
            uid,
            usertoken
        }).then((res) => {
            if (res.data.logined == true) {
                resolve(new UserLoginData(+uid, true, res.data.username, res.data.admin, usertoken));
            }
            else {
                resolve(new UserLoginData());
            }
        });
    });

}
function getUserData(uid: number) {
    return new Promise<UserPublicData>((resolve, reject) => {
        axios.get(`${ip}/getUserData/${uid}`).then((res) => {
            resolve(res.data);
            return;
        }).catch((err) => {
            console.error(err);
            reject(err);
        })
    })
}

export { keepLogin, getUserData };
