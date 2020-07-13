export default class CardList {
    constructor (card, container, popup, popupImg) {
        this.container = container;
        this.card = card;
        this.popup = popup;
        this.popupImg = popupImg;
    }

    addCard(dataElement) {
        const card = this.card(dataElement, this.container, this.popup, this.popupImg);
        this.container.append(card);
    }

    render(array) {
        array.forEach(item => {
            this.addCard(item);
        
    });
    }
}


