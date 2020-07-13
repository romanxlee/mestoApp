class FormValidator {
    constructor(form) {
        this.form = form;
        this.button = this.form.querySelector('.button');
    }


    checkInputValidity() {
    const nameForm = this.form.querySelector('.popup__input_type_name');
    const descriptionForm = this.form.querySelector('.popup__input_type_link-url');
    const errorName = document.querySelector('.error_name');
    const errorDescription = document.querySelector('.error_description');
    if (nameForm.validity.tooShort || nameForm.validity.tooLong) {
      errorName.classList.remove('error_hide');
      errorName.textContent = errorMessages.wrongLenght;
      return false
    } else if (nameForm.validity.valueMissing) {
      errorName.classList.remove('error_hide');
      errorName.textContent = errorMessages.emptyValue;
      return false;
    } else if (descriptionForm.validity.tooShort || descriptionForm.validity.tooLong) {
      errorDescription.classList.remove('error_hide');
      errorDescription.textContent = errorMessages.wrongLenght;
      return false;
    } else if (descriptionForm.validity.valueMissing) {
      errorDescription.classList.remove('error_hide');
      errorDescription.textContent = errorMessages.emptyValue;
      return false;
    } else {
      errorName.classList.add('error_hide');
      errorDescription.classList.add('error_hide');
      return true;
    }
    }

    setSubmitButtonState() {
        if (this.checkInputValidity() == true) {
            this.button.removeAttribute('disabled');
            this.button.classList.add('popup__button_active');
        } else {
            this.button.setAttribute('disabled', true);
            this.button.classList.remove('popup__button_active');
        }
    }

    setEventListeners() {
        this.form.onload = this.checkInputValidity.bind(this);
        this.form.onload = this.setSubmitButtonState.bind(this);
        this.form.oninput = this.checkInputValidity.bind(this);
        this.form.oninput = this.setSubmitButtonState.bind(this);
    }

    formReset() {
      this.form.reset();
    }
}

