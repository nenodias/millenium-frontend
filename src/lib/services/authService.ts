export const authService = {
    async login(user: string, password: string): Promise<boolean> {
        console.log(user);
        console.log(password);
        return true;
    }
}