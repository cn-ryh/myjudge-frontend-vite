function translateTime(date: Date) {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
function getQueryVariable(variable: string) {
    const query = window.location.href.split(`?`)[1];
    if (!query) {
        return null;
    }
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (null);
}
function jump(url: string) {
    window.open(url);
}
export { translateTime, getQueryVariable, jump }