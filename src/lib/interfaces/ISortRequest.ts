import type SortDirection from "$lib/enums/SortDirection";


export default interface ISortRequest {
    sortColumn: string;
    sortDirection: SortDirection;
}
