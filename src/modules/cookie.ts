import Cookies from 'js-cookie';

export const setCookie = (label: string, value: string, cookieExpires: number) => {
    //          名称   保存的值           保存的时间         
    Cookies.set(label, value, { expires: cookieExpires });
};

export const getCookie = (label: string) => {
    const value = Cookies.get(label);
    if (value) return value;
    else return null;
};

export const delCookie = (label: string) => {
    Cookies.remove(label);
};