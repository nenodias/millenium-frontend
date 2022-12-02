import type IFilterPageable from "$interfaces/IFilterPageable";
import type IPageableContent from "$interfaces/IPageableContent";

export default interface IDataTableService<T> {
    params: IFilterPageable;
    search: () => Promise<IPageableContent<T>>;
    reOrder: (column: string) => void;
}