import type IPageable from "./IPageable";

export default interface IPageableContent<T>{
    content:T[];
    pageable:IPageable;
    totalPages:number;
    totalElemenets:number;
    size:number;
    number:number;
}
