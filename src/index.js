import "./pages/index.css";

import Api from "./js/Api.js";
import Card from "./js/Card.js";
import CardList from "./js/CardList.js";
import FormValidator from "./js/FormValidator.js";
import Popup from "./js/Popup.js";
import UserInfo from "./js/UserInfo.js";

const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
        authorization: '71b080ef-be6b-414f-80d6-39f640d6ec77',
        'Content-Type': 'application/json'
    }
});

const cardsContainer = document.querySelector('.places-list');
const popupPlace = document.querySelector('.popup__place');
const form = document.forms.new;
const name = form.elements.name;
const link = form.elements.link;
const editForm = document.forms.edit;

function createCards(item, container, popup, popupImg) {
    const card = new Card(item, container, popup, popupImg);
    return card.create();
}

const errorMessages =
{
    wrongLenght: 'Должно быть от 2 до 30 символов',
    emptyValue: 'Это обязательное поле'
};

//ПОПАПЫ
const addPopup = new Popup(document.querySelector('.popup'));
const editPopup = new Popup(document.querySelector('.popup_edit'));
const imagePopup = new Popup(document.querySelector('.popup_img'));
document.querySelector('.popup__close').addEventListener('click', addPopup.close.bind(addPopup));
document.querySelector('.popup__close_edit').addEventListener('click', editPopup.close.bind(editPopup));


document.querySelector('.popup__close_img').addEventListener('click', imagePopup.close.bind(imagePopup));

const validateAdd = new FormValidator(form);
validateAdd.setEventListeners();

function openAddPopup(event) {
    event.preventDefault();
    addPopup.open();
    validateAdd.formReset();
    validateAdd.checkInputValidity();
    validateAdd.setSubmitButtonState();
}
document.querySelector('.user-info__button').addEventListener('click', openAddPopup);



//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

function addNewCard(event) {
    event.preventDefault();
    loadInitial.addCard({name: name.value, link: link.value});
    addPopup.close();
}
form.addEventListener('submit', addNewCard);


//РДЕАКТИРОВАНИЕ ИНФО
const userName = document.querySelector('.user-info__name');
const userDescription = document.querySelector('.user-info__job');
const userInfo = new UserInfo(editForm, userName, userDescription, api, editPopup);
function changeInfo(event) {
    event.preventDefault();
    userInfo.updateUserInfo();
}
editForm.addEventListener('submit', changeInfo);

//Валидация
const validateEdit = new FormValidator(editForm);
validateEdit.setEventListeners();




function openEditPopup(event) {
    event.preventDefault();
    editPopup.open(event);
    validateEdit.formReset();
    userInfo.setPopupInfo();
    validateEdit.checkInputValidity();
    validateEdit.setSubmitButtonState();
}
document.querySelector('.user-info__edit-button').addEventListener('click', openEditPopup);




const loadInitial = new CardList(createCards, cardsContainer, imagePopup, popupPlace)
api.getInitialCards()
    .then(res => {
    loadInitial.render(res)
})
    .catch(err => console.log(err))
;

document.onload = userInfo.setUserInfo()
