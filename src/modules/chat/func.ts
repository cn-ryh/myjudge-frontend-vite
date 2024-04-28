import { currectUser } from "../user/currectUser";

function getAnotherUser(id: string) {
    const users = id.split('&');
    return +users[0] == currectUser.uid ? users[1] : users[0];
}
function getTime(time: number) {
    if (new Date().toLocaleDateString() === new Date(time).toLocaleDateString()) {
        return new Date(time).toLocaleTimeString();
    }
    else {
        return new Date(time).toLocaleDateString();
    }
}

export {getAnotherUser,getTime}