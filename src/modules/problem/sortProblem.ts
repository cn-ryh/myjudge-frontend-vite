import { IProblem } from "../interface";

function sortBase(pid1:string,pid2:string):number
{
    const type1 = pid1.slice(0, 1);
    const type2 = pid2.slice(0, 1);
    const id1 = pid1.slice(1);
    const id2 = pid2.slice(1);
    if(type1 !=  type2)
    {
        return (type1 < type2)?-1:1;
    }
    else
    {
        return Number(id1) - Number(id2);
    }
}
export function sortProblemPid(pids:string[]):string[]
{
    return pids.sort(sortBase);
}
export function sortProblem(problems:IProblem[]):IProblem[]
{
    return problems.sort((p1,p2)=>sortBase(p1.pid,p2.pid));
}
