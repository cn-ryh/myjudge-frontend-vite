export const State = {
    "Accept": Symbol("Accept"),
    "Wrong Answer": Symbol("Wrong Answer"),
    "Time Limit Error": Symbol("Time Limit Error"),
    "Merory Limit Error": Symbol("Merory Limit Error"),
    "Unknow Error": Symbol("Unknow Error")
};


export class JudgePoint {
    index: number = 0;
    state: unknown;
    time = null;
    merory = null;
}

export class Record {
    id: unknown;
    state: unknown;
    time: unknown;
    merory: unknown;
    detail: unknown;
}