import type IFilterPageable from "$interfaces/IFilterPageable";

export default interface IFalhaFilter extends IFilterPageable {
    id?: number;
    descricao?: string;
}
