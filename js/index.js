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

/*
    Класс Api создан, даные с сервера приходят и профиль обновляется, это отлично
    Но есть замечания:

    Надо исправить:
    - убрать обработку ошибок из методов класса Api и разместить её в самом конце цепочки обработки промиса
    - при попытке добавить карточку падает ошибка, создавать экземпляр CardList глобально, а не внутри обработки ответа сервера
    - все изменения на странице должны происходить, только после того, как сервер ответил подтверждением
    - при сохранении профиля использовать данные которые вернул сервер, а не делать ещё один запрос
    
    Можно лучше:
    - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод
*/


/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/
