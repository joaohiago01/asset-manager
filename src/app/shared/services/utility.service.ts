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

    showConfirmationModal() {
        const confirmationModal: HTMLDivElement = <HTMLDivElement> document.querySelector("#confirmationModal");
        const overlay: HTMLDivElement = <HTMLDivElement> document.querySelector(".overlay");

        confirmationModal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }

    closeConfirmationModal() {
        const confirmationModal: HTMLDivElement = <HTMLDivElement> document.querySelector("#confirmationModal");
        const overlay: HTMLDivElement = <HTMLDivElement> document.querySelector(".overlay");
        
        confirmationModal.classList.add("hidden");
        overlay.classList.add("hidden");
    }

    showConfirmationModalByName(modalName: string) {
        const confirmationModal: HTMLDivElement = <HTMLDivElement> document.querySelector(modalName);
        const overlay: HTMLDivElement = <HTMLDivElement> document.querySelector(".overlay");

        confirmationModal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }

    closeConfirmationModalByName(modalName: string) {
        const confirmationModal: HTMLDivElement = <HTMLDivElement> document.querySelector(modalName);
        const overlay: HTMLDivElement = <HTMLDivElement> document.querySelector(".overlay");
        
        confirmationModal.classList.add("hidden");
        overlay.classList.add("hidden");
    }

}