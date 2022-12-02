import type INavigationService from "$interfaces/services/INavigationService";

export function makeNavigationService(context: string, goto: CallableFunction): INavigationService{

    const goEditar = (id: any) => {
        goto(`/${context}/form?id=${id}`);
    };

    const goIndex = () =>{
        goto(`/${context}`);
    }

    return {
        goEditar,
        goIndex
    };
}