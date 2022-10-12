import { browser } from '$app/environment';
import { authService } from '$services/authService';
import { writable } from "svelte/store";

const defaultValue = "";
const authInitialValue = browser ? window.localStorage.getItem('auth') ?? defaultValue : defaultValue;
const authStore = writable<string>(authInitialValue);

const tokenInitialValue = browser ? window.localStorage.getItem('token') ?? defaultValue : defaultValue;
const tokenStore = writable<string>(tokenInitialValue);

authStore.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('auth', value);
    }
});

tokenStore.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('token', value);
    }
});

export const auth = {
    set: authStore.set,
    subscribe: authStore.subscribe,
    setAuth(user: string, password: string) {
        authStore.set(authService.getBasincAuthentication(user, password));
    },
    clear() {
        authStore.set("");
    },
    getAuth(): string {
        let auth = defaultValue;
        authStore.subscribe((value) => auth = value)();
        return auth;
    }
}

export const token = {
    set: tokenStore.set,
    subscribe: tokenStore.subscribe,
    clear() {
        tokenStore.set("");
    },

    refresh() {
        const value = token.getToken();
        authService.refreshToken(value);
    },
    getToken(): string {
        let token = defaultValue;
        tokenStore.subscribe((value) => token = value)();
        return token;
    }
}