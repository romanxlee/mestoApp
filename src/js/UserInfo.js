export default class UserInfo {
    constructor (form, userName, userDescription, api, popup) {
        this.form = form;
        this.userName = userName;
        this.userDescription = userDescription;
        this.name = this.form.elements.name;
        this.description = this.form.elements.description;
        this.api = api;
        this.popup = popup;
    }

    setUserInfo() {
        this.api.getUserData()
        .then(res => {
            this.userName.textContent = res.name;
            this.userDescription.textContent = res.about;
        })
        .catch(err => console.log(err))
    }

    setPopupInfo() {
        this.name.value = this.userName.textContent;
        this.description.value = this.userDescription.textContent;
    }

    
    updateUserInfo() {
        this.api.changeUserInfo(this.name.value, this.description.value)
        .then((res) => {
            this.userName.textContent = res.name;
            this.userDescription.textContent = res.about;
            this.popup.close();
        })
        .catch(err => console.log(err));
    }
}
