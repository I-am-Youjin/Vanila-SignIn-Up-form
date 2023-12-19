const signInTitle = document.getElementById("sign_in_title");
const signUpTitle = document.getElementById("sign_up_title");
const formsContainer = document.getElementById("forms_container");
const popUpContainer = document.getElementById("popup_container");
let popUpOpenedState = false;
const customInput = document.getElementsByClassName("custom_input");
const titleContainer = document.getElementById("title_container");
const registerBtn = document.getElementById("sign_up_btn");
const loginBtn = document.getElementById("sign_in_btn");
const signInInputEmail = document.getElementsByClassName("sign_in_input")[0];
const signInInputPassword = document.getElementsByClassName("sign_in_input")[1];
const signUpInputName = document.getElementsByClassName("sign_up_input")[0];
const signUpInputPhone = document.getElementsByClassName("sign_up_input")[1];
const signUpInputEmail = document.getElementsByClassName("sign_up_input")[2];
const signUpInputPassword = document.getElementsByClassName("sign_up_input")[3];
const signUpUpperCheckbox = document.getElementById("sign_up_checkbox_upper");
const signUpLowerCheckbox = document.getElementById("sign_up_checkbox_lower");
const openPopUpBtn = document.getElementById("open_popup_btn");
const popupCross = document.getElementById("popup_cross");
const popupSuccess = document.getElementById("popup_success");
let popUpSuccessOpenedState = false;
const popupSuccessCross = document.getElementById("cross_success");

console.log(signUpUpperCheckbox.checked);

let signInValues = {
  email: "",
  password: "",
};

let signUpValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
};

const handleChangeSignInValue = (fieldName, value) => {
  if (fieldName === "email") {
    signInValues.email = value;
  } else if (fieldName === "password") {
    signInValues.password = value;
  }
  console.log(signInValues);
};

const handleChangeSignUpValue = (fieldName, value) => {
  if (fieldName === "name") {
    signUpValues.name = value;
  } else if (fieldName === "phone") {
    signUpValues.phone = value;
  } else if (fieldName === "email") {
    signUpValues.email = value;
  } else if (fieldName === "password") {
    signUpValues.password = value;
  }
  console.log(signUpValues);
};

console.log(signInInputEmail.value);

for (let input of customInput) {
  input.addEventListener("focus", () => {
    input.labels.forEach((label) => {
      label.classList.add("label-active");
    });
  });
  input.addEventListener("blur", () => {
    input.labels.forEach((label) => {
      label.classList.remove("label-active");
    });
  });
}

let signInTitleState = true;

const handleToogleOpenPopUp = () => {
  if (!popUpOpenedState) {
    popUpOpenedState = !popUpOpenedState;
    popUpContainer.classList.add("popup_container-opened");
  } else if (popUpOpenedState) {
    popUpOpenedState = !popUpOpenedState;
    popUpContainer.classList.remove("popup_container-opened");
  }
};
const handleToogleOpenPopUpSuccess = () => {
  if (!popUpSuccessOpenedState) {
    popUpSuccessOpenedState = !popUpSuccessOpenedState;
    popupSuccess.classList.add("popup_success-opened");
  } else if (popUpSuccessOpenedState) {
    popUpSuccessOpenedState = !popUpSuccessOpenedState;
    popupSuccess.classList.remove("popup_success-opened");
  }
};

const handleChangeFormToSignIn = () => {
  if (!signInTitleState) {
    signInTitleState = true;
    signInTitle.classList.add("title-active");
    signUpTitle.classList.remove("title-active");
    formsContainer.classList.remove("forms_container-active");
    popUpContainer.classList.remove("popup_container-active");
    titleContainer.classList.remove("sign_up_sign_in_title_container-sign_up");
  }
};

const handleChangeFormToSignUp = () => {
  if (signInTitleState) {
    signInTitleState = false;
    signUpTitle.classList.add("title-active");
    signInTitle.classList.remove("title-active");
    formsContainer.classList.add("forms_container-active");
    popUpContainer.classList.add("popup_container-active");
    titleContainer.classList.add("sign_up_sign_in_title_container-sign_up");
  }
};

const asyncSignUpUser = async () => {
  try {
    const resp = await fetch("https://studapi.teachmeskills.by/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signUpValues.name,
        email: signUpValues.email,
        password: signUpValues.password,
      }),
    });
    const data = await resp.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const asyncSignInUser = async () => {
  try {
    const resp = await fetch(
      "https://studapi.teachmeskills.by/auth/jwt/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInValues.email,
          password: signInValues.password,
        }),
      }
    );
    const data = await resp.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const handleRegister = () => {
  if (
    signUpValues.name &&
    signUpValues.phone &&
    signUpValues.email &&
    signUpValues.password &&
    signUpUpperCheckbox.checked &&
    signUpLowerCheckbox.checked
  ) {
    asyncSignUpUser();
    handleToogleOpenPopUp();
    handleToogleOpenPopUpSuccess();
  } else if (!signUpUpperCheckbox.checked || !signUpLowerCheckbox.checked) {
    alert("Примите соглашение");
  }
};

const handleLogIn = () => {
  if (signInValues.email && signInValues.password) {
    asyncSignInUser();
  } else {
    alert("Заполните все поля");
  }
};

signInTitle.addEventListener("click", handleChangeFormToSignIn);
signUpTitle.addEventListener("click", handleChangeFormToSignUp);
signInInputEmail.addEventListener("change", (event) =>
  handleChangeSignInValue("email", event.target.value)
);
signInInputPassword.addEventListener("change", (event) =>
  handleChangeSignInValue("password", event.target.value)
);
signUpInputName.addEventListener("change", (event) =>
  handleChangeSignUpValue("name", event.target.value)
);
signUpInputPhone.addEventListener("change", (event) =>
  handleChangeSignUpValue("phone", event.target.value)
);
signUpInputEmail.addEventListener("change", (event) =>
  handleChangeSignUpValue("email", event.target.value)
);
signUpInputPassword.addEventListener("change", (event) =>
  handleChangeSignUpValue("password", event.target.value)
);
registerBtn.addEventListener("click", handleRegister);
openPopUpBtn.addEventListener("click", handleToogleOpenPopUp);
popupCross.addEventListener("click", handleToogleOpenPopUp);
popupSuccessCross.addEventListener("click", handleToogleOpenPopUpSuccess);
loginBtn.addEventListener("click", handleLogIn);
