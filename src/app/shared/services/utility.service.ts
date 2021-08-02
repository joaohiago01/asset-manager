import { Injectable } from "@angular/core";

@Injectable()
export class UtilityService {

    showNotification(message: string) {
        const notificationBox: HTMLDivElement = <HTMLDivElement> document.querySelector("#notification");
        const notificationMessage: HTMLSpanElement = <HTMLSpanElement> document.querySelector("#notificationMessage");

        notificationMessage.textContent = message;
        notificationBox.classList.remove("hidden");
    }

    closeNotification() {
        const notificationBox: HTMLDivElement = <HTMLDivElement> document.querySelector("#notification");
        notificationBox.classList.add("hidden");
    }

}