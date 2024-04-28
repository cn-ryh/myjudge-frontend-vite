import axios from "axios";
import { ip } from "@/modules/ip";
import { getCookie } from "@/modules/cookie";
class UserLoginData {
    uid = 0;
    username = ``
    logined = false;
    admin = false;
    token = ``;
    constructor(uid = 0, logined = false, username = ``, admin = false, token = ``) {
        this.uid = uid;
        this.logined = logined;
        this.admin = admin;
        this.token = token;
        this.username = username;
    }
}
class UserPublicData {
    uid = 0;
    username = ``
    tag: { color: string, text: string, textcolor: string }[] = [];
    constructor(uid = 0, username = ``, tag = []) {
        this.uid = uid;
        this.username = username;
        this.tag = tag;
    }
}
/**
 * 
 * @returns {Promise<UserLoginData>}
 */
function keepLogin(): Promise<UserLoginData> {
    return new Promise((resolve) => {
        const uid = getCookie("uid");
        const usertoken = getCookie("token");
        if (!uid || !usertoken) {
            resolve(new UserLoginData());
            return;
        }
        if (uid === `` || usertoken === ``) {
            resolve(new UserLoginData());
        }
        axios.post(`${ip}/keepLogin`, {
            uid: uid,
            usertoken: usertoken
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
