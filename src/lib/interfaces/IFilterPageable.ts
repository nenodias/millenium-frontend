import type ISortRequest from "./ISortRequest";
export default interface IFilterPageable {
    sort: ISortRequest;
    size: number;
    page: number;
}
