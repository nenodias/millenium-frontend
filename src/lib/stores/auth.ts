import { writable } from "svelte/store";

const { set, subscribe } = writable<string | null>(null);

export const auth = {
    set,
    subscribe,
    setAuth(user: string, password: string) {
        const value = `${user}:${password}`;
        set(btoa(value));
    },
    clear() {
        set(null);
    },
    getAuth() {
        let auth = null;
        subscribe((value) => auth = value)();
        return auth;
    }
}