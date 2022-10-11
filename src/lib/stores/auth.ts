import { browser } from '$app/environment';
import { writable } from "svelte/store";

const defaultValue = "";
const initialValue = browser ? window.localStorage.getItem('auth') ?? defaultValue : defaultValue;
const { set, subscribe } = writable<string>(initialValue);

subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('auth', value);
    }
});

export const auth = {
    set,
    subscribe,
    setAuth(user: string, password: string) {
        const value = `${user}:${password}`;
        set(btoa(value));
    },
    clear() {
        set("");
    },
    getAuth() {
        let auth = null;
        subscribe((value) => auth = value)();
        return auth;
    }
}