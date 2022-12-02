import type IFilterPageable from "$interfaces/IFilterPageable";
import type IPageableContent from "$interfaces/IPageableContent";

export default interface IDataTable {
    title?: string;
    filters?: IFilterPageable;
    retorno?: IPageableContent<any>;
    pesquisar?(): void;
    onNext?(): void;
    onPrevious?(): void;
}
