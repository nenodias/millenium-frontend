import { client } from "$services/axiosService";

interface IToken {
    token: string
}

export const authService = {
    async login(user: string, password: string): Promise<IToken | null> {
        let basicAuth = `Basic ${authService.getBasincAuthentication(user, password)}`;
        try {
            let res = await authService.refreshToken(basicAuth);
            return res;
        } catch (err) {
            console.error("Erro ao se autenticar:", err);
        }
        return null;
    },

    async refreshToken(basicAuth: string): Promise<IToken | null> {
        try {
            const res = await client.post("/auth/", null, {
                headers: {
                    "Authorization": basicAuth
                }
            });
            if (res.status == 200) {
                return res.data as IToken;
            }
        } catch (err) {
            console.error("Erro ao se autenticar:", err);
        }
        return null;
    },
    getBasincAuthentication(user: string, password: string): string {
        const value = `${user}:${password}`;
        return btoa(value);
    }
}