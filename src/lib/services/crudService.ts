import type IFilterPageable from "$interfaces/IFilterPageable";
import type IPageableContent from "$interfaces/IPageableContent";
import type ISortRequest from "$interfaces/ISortRequest";
import type ICrudService from "$interfaces/services/ICrudService";
import { client } from "./axiosService";


function makeClient<T>(base: string): ICrudService<T> {

    const findAll = async function (token: string, params: IFilterPageable): Promise<IPageableContent<T>> {
        try {
            let stringParams = "";
            if (params !== null && params !== undefined) {
                for (const [key, value] of Object.entries(params)) {
                    if (key === "sort") {
                        let sort = value as ISortRequest;
                        if (sort !== undefined) {
                            stringParams += `sortColumn=${sort.sortColumn}&`;
                            stringParams += `sortDirection=${sort.sortDirection}`;
                        }
                    } else {
                        if (value !== "") {
                            stringParams += `${key}=${value}`;
                        }
                    }
                    stringParams += `&`;
                }
            }
            const resp = await client.get(`/${base}/?${stringParams}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (resp.status >= 200 && resp.status <= 299) {
                return Promise.resolve(resp.data as IPageableContent<T>);
            }
            return Promise.reject(resp);
        } catch (err: any) {
            console.error(err);
            return Promise.reject(err);
        }
    };

    const findById = async function (id: number, token: string): Promise<T> {
        try {
            const resp = await client.get(`/${base}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (resp.status >= 200 && resp.status <= 299) {
                return Promise.resolve(resp.data as T);
            }
            return Promise.reject(resp);
        } catch (err: any) {
            console.error(err);
            return Promise.reject(err);
        }
    };

    const create = async function (falha: T, token: string): Promise<T> {
        try {
            const resp = await client.post(`/${base}/`, JSON.stringify(falha), {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (resp.status >= 200 && resp.status <= 299) {
                return Promise.resolve(resp.data as T);
            }
            return Promise.reject(resp);
        } catch (err: any) {
            console.error(err);
            return Promise.reject(err);
        }
    };

    const deleteById = async function (id: number, token: string): Promise<boolean> {
        try {
            const resp = await client.delete(`/${base}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (resp.status >= 200 && resp.status <= 299) {
                return Promise.resolve(true);
            }
            return Promise.reject(resp);
        } catch (err: any) {
            console.error(err);
            return Promise.reject(err);
        }
    };

    return {
        findAll,
        findById,
        create,
        deleteById
    };
}

export {
    makeClient
}
