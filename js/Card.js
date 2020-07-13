class Card {
    constructor (item, container, popup, popupImg) {
        this.item = item;
        this.container = container;
        this.link = this.item.link;
        this.name = this.item.name;
        this.popup = popup;
        this.popupImg = popupImg;
    }

    create() {

        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');
        
        const cardImage = document.createElement('div');
        placeCard.appendChild(cardImage);
        cardImage.classList.add('place-card__image');
        cardImage.style.backgroundImage = 'url(' + this.link + ')';
        cardImage.addEventListener('click', this.zoom.bind(this))
        
        const buttonDelete = document.createElement('button');
        cardImage.appendChild(buttonDelete);
        buttonDelete.classList.add('place-card__delete-icon');
        buttonDelete.addEventListener('click', this.remove.bind(this));
        
        const cardDescription = document.createElement('div');
        placeCard.appendChild(cardDescription);
        cardDescription.classList.add('place-card__description');
        
        const cardName = document.createElement('h3');
        cardDescription.appendChild(cardName);
        cardName.classList.add('place-card__name');
        cardName.textContent = this.name;
        
        const buttonLike = document.createElement('button');
        cardDescription.appendChild(buttonLike);
        buttonLike.classList.add('place-card__like-icon');
        buttonLike.addEventListener('click', this.like);
        
        return placeCard;      
    }

    like(event) {
        if (event.target.closest('.place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        }
    }

    remove(event) {
        if (event.target.closest('.place-card__delete-icon')) {
            const card = event.target.closest('.place-card');
            this.container.removeChild(card);
        }
    }

    zoom(event) {
        if (event.target.classList.contains('place-card__image')) {
            this.popupImg.setAttribute('src', `${event.target.style.backgroundImage.slice(5, -2)}`);
            this.popup.open();
    }
}
}


