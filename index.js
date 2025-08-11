"use strict";

const body = document.querySelector("body");

if (!localStorage.getItem("character")) {
  initialPage();
} else {
  let gamer = JSON.parse(localStorage.getItem("character"));
  console.log(gamer);
}

function createElement(tag, nameForClass, elemForInsert) {
  const elem = document.createElement(tag);
  elem.classList.add(nameForClass);
  elemForInsert.append(elem);
}

function initialPage() {
  createElement("div", "registration-field", body);

  const registrationField = document.querySelector(".registration-field");
  createElement("h1", "registration-field__title", registrationField);
  const title = document.querySelector(".registration-field__title");
  title.innerText = "Create Your Character";

  createElement("label", "registration-field__label", registrationField);
  const label = document.querySelector(".registration-field__label");
  label.setAttribute("for", "registration-field__input");
  label.innerText = "Character Name";

  createElement("input", "registration-field__input-class", registrationField);
  const input = document.querySelector(".registration-field__input-class");
  input.setAttribute("type", "text");
  input.setAttribute("id", "registration-field__input");
  input.setAttribute("name", "name");
  input.setAttribute("required", "");
  input.setAttribute("minlength", "1");
  input.setAttribute("maxlength", "30");
  input.setAttribute("autocomplete", "off");
  input.focus();

  createElement("button", "registration-field__button", registrationField);
  const button = document.querySelector(".registration-field__button");
  button.innerText = "Create Character";

  createElement("div", "tooltip", body);
  const tooltip = document.querySelector(".tooltip");
  tooltip.innerText = "Please, enter at least one character";
}

const button = document.querySelector(".registration-field__button");
button.addEventListener("click", () => {
  const input = document.querySelector(".registration-field__input-class");

  if (input.value.length === 0) {
    const tooltip = document.querySelector(".tooltip");
    tooltip.style.opacity = "1";
    tooltip.style.zIndex = "1";

    setTimeout(() => {
      tooltip.style.opacity = "0";
      tooltip.style.zIndex = "-1";
      input.focus();
    }, 3000);
  } else {
    localStorage.setItem(
      "character",
      JSON.stringify([
        {
          name: input.value,
        },
      ])
    );
  }
});
