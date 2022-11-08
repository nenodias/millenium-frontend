import type IAlert from "$interfaces/IAlert";
import { writable } from "svelte/store";

const { set, subscribe, update } = writable<IAlert[]>([]);

export const alerts = {
    set,
    subscribe,
    addItem(item: IAlert) {
        update((actual) => [...actual, item]);
    },
    removeItem(item: IAlert) {
        update((actual) => actual.filter((i) => i !== item));
    },
    get() {
        let myList: IAlert[] = [];
        alerts.subscribe((value) => myList = value)();
        return myList;
    }
}