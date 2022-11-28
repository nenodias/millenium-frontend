import type ISortRequest from "./ISortRequest";
export default interface IPageable {
    sort: ISortRequest;
    pageSize: number;
    pageNumber: number;
}
