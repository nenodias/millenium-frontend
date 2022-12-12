import axios from "axios";
import type { AxiosResponse } from "axios";

const client = axios.create({
    baseURL: 'http://150.230.83.193/go/api',
    timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export {
    client,
    responseBody
}