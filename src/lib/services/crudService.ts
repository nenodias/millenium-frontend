import type IPageableContent from "$interfaces/IPageableContent";
import { client } from "./axiosService";


function makeClient<T>(base: string) {

    const findAll = async function (token: string): Promise<IPageableContent<T>> {
        try {
            const resp = await client.get(`/${base}/`, {
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

    return {
        findAll,
        findById,
        create
    };
}

export {
    makeClient
}
