class Popup {
    constructor(container) {
        this.container = container;
    }

    open() {
        this.container.classList.add('popup_is-opened');
    }

    close() {
        this.container.classList.remove('popup_is-opened');
    }
}

