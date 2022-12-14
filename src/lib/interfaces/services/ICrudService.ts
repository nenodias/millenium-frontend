import type IFilterPageable from "$interfaces/IFilterPageable";
import type IPageableContent from "$interfaces/IPageableContent";

export default interface ICrudService<T> {
    findAll: (token: string, params: IFilterPageable) => Promise<IPageableContent<T>>;
    findById: (id: number, token: string) => Promise<T>;
    create: (model: T, token: string) => Promise<T>;
    deleteById: (id: number, token: string) => Promise<boolean>;
}