import { makeAutoObservable } from 'mobx';

export class NotificationStore {
    defaultError = false;

    constructor() {
        makeAutoObservable(this);
    }

    showDefaultErrorNotif(value: boolean) {
        this.defaultError = value;
    }

    clear() {
        this.defaultError = false;
    }
}
