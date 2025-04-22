class FormValidator {
  constructor(configData, formElement) {
    this._inputSelector = configData.inputSelector;
    this._submitButtonSelector = configData.submitButtonSelector;
    this._inactiveButtonClass = configData.inactiveButtonClass;
    this._inputErrorClass = configData.inputErrorClass;
    this._errorSpanText = configData.errorSpanText;
    this._formElement = formElement;
  }

  // Muestra el mensaje de error y cambia los estilos del campo de entrada
  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorSpanText);
    inputElement.classList.add(this._inputErrorClass);
  }

  // Esconde el mensaje de error y retira los estilos del campo de entrada
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorSpanText);
    this._errorElement.textContent = "";
  }

  // Valida el campo de entrada y muestra si es válido o inválido
  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Valida toda la lista de campos de entrada y devuelve si alguna es inválida
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Cambia el estado de Submit en caso de tener un campo de entrada inválido
  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute("disabled", true);
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute("disabled");
    }
  }

  // Añade controladores/detectores de evento a cada input
  _setEventListeners(inputList) {
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState(inputList, submitButton);

    inputList.forEach((inputElement) => {
      this._checkValidity(inputElement);
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }

  // Proporciona los detectores de eventos al formulario y genera un array de los campos de entrada
  enableValidation() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._setEventListeners(this._inputList);
  }
}

const configParameters = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorSpanText: "form__input-error_active",
};

export { FormValidator, configParameters };
