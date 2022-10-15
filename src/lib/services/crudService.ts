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
                return resp.data as IPageableContent<T>;
            }
        } catch (err) {
            console.error(err);
        }
        return Promise.reject();
    };

    const findById = async function (id: number, token: string): Promise<T> {
        try {
            const resp = await client.get(`/${base}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (resp.status >= 200 && resp.status <= 299) {
                return resp.data as T;
            }
        } catch (err) {
            console.error(err);
        }
        return Promise.reject();
    };

    const create = async function (falha: T, token: string): Promise<T> {
        try {
            const resp = await client.post(`/${base}/`, JSON.stringify(falha), {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (resp.status >= 200 && resp.status <= 299) {
                return resp.data;
            }
        } catch (err) {
            console.error(err);
        }
        return Promise.reject();
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
