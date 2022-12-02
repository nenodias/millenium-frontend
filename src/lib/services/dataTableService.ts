import type IDataTable from "$interfaces/components/IDataTable";
import type IFilterPageable from "$interfaces/IFilterPageable";
import type IPageableContent from "$interfaces/IPageableContent";
import type ICrudService from "$interfaces/services/ICrudService";
import type IDataTableService from "$interfaces/services/IDataTableService";
import type IToken from "$interfaces/stores/IToken";
import { toggleDirection } from "$lib/enums/SortDirection";


export function makeDataTableService<T>(params: IFilterPageable, token: IToken, client: ICrudService<T>, dataTable: IDataTable): IDataTableService<T> {


    const search = (): Promise<IPageableContent<T>> => {
        console.log(`Realizando consulta`, params);
        return client.findAll(token.getToken(), params);
    };

    const reOrder = (column: string) => {
        console.log("ReOrder", params);
        if (params.sort.sortColumn === column) {
            params.sort = {
                sortColumn: column,
                sortDirection: toggleDirection(params.sort.sortDirection),
            };
        } else {
            params.sort = {
                sortColumn: column,
                sortDirection: params.sort.sortDirection,
            };
        }
        if (dataTable.pesquisar) {
            dataTable.pesquisar();
        }
    };

    return {
        search,
        reOrder,
        params
    } as IDataTableService<T>;

};