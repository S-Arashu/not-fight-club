"use strict";

const body = document.querySelector("body");
let winsCount = 0;
let losesCount = 0;
let usingAvatar = 1;

const characters = [
  "./assets/img/character1.png",
  "./assets/img/character2.png",
  "./assets/img/character3.png",
  "./assets/img/character4.png",
  "./assets/img/character5.png",
  "./assets/img/character6.png",
];

if (!localStorage.getItem("character")) {
  createInitialPage();
} else {
  createHomePage();
}

function createElement(tag, nameForClass, elemForInsert) {
  const elem = document.createElement(tag);
  elem.classList.add(nameForClass);
  elemForInsert.append(elem);
}

function createInitialPage() {
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

function createHomePage() {
  let gamer = JSON.parse(localStorage.getItem("character"));

  createElement("h1", "greeting_text", body);
  const title = document.querySelector(".greeting_text");
  title.innerText = `Hi, ${gamer[0].name}!`;

  createElement("button", "button_fight", body);
  const button = document.querySelector(".button_fight");
  button.innerText = "Fight!";

  createElement("button", "button_character", body);
  const character = document.querySelector(".button_character");
  character.innerText = "Character";

  character.addEventListener("click", () => {
    let gamer = JSON.parse(localStorage.getItem("character"));
    console.log("hi");
    body.innerHTML = "";
    createCharacterPage();
    const avatar = document.querySelector(".button_avatar");

    if (avatar) {
      console.log("Hi again");
      avatar.addEventListener("click", () => {
        createElement("div", "background", body);
        const background = document.querySelector(".background");
        createElement("div", "select-field", background);
        const select = document.querySelector(".select-field");

        createElement("div", "cross", select);
        const cross = document.querySelector(".cross");
        createElement("span", "cross-span", cross);
        createElement("span", "cross-span", cross);

        for (let i = 0; i < characters.length; i++) {
          const label = document.createElement("label");
          select.append(label);
          const input = document.createElement("input");
          input.classList.add("input-for-img");
          input.setAttribute("type", "radio");
          input.setAttribute("name", "image");
          input.setAttribute("value", `${characters[i]}`);
          label.append(input);

          const wrapper = document.createElement("div");
          wrapper.classList.add("wrapper-for-img");
          label.append(wrapper);

          const img = document.createElement("img");
          img.classList.add("choose-character-img");
          img.setAttribute("alt", `Character image ${i + 1}`);
          img.setAttribute("width", "180px");
          img.setAttribute("height", "240px");
          img.setAttribute("src", `${characters[i]}`);
          wrapper.append(img);
          img.addEventListener("click", () => {
            gamer[0].usingAvatar = +img.alt.at(-1);
            localStorage.setItem("character", JSON.stringify(gamer));
          });

          if (gamer[0].usingAvatar === i + 1) {
            input.setAttribute("checked", "");
          }

          cross.addEventListener("click", () => {
            background.remove();
          });
        }

        const images = document.getElementsByName("image");
        // const selectedImage = document.querySelector(".selected-image");

        images.forEach((image) => {
          image.addEventListener("change", function () {
            const selectedImage = document.querySelector(".character-img");
            selectedImage.src = this.value;
          });
        });
      });
    }
  });
}

function createCharacterPage() {
  let gamer = JSON.parse(localStorage.getItem("character"));
  createElement("h1", "character-name", body);
  const name = document.querySelector(".character-name");
  name.innerText = `Name: ${gamer[0].name}`;

  createElement("div", "character-page", body);
  const page = document.querySelector(".character-page");

  createElement("img", "character-img", page);
  const img = document.querySelector(".character-img");
  img.setAttribute("alt", "Character image 1");
  img.setAttribute("width", "480px");
  img.setAttribute("height", "540px");
  img.setAttribute("src", `${characters[gamer[0].usingAvatar - 1]}`);

  createElement("div", "info-character", page);
  const info = document.querySelector(".info-character");

  createElement("p", "count-of-wins", info);
  const wins = document.querySelector(".count-of-wins");
  wins.innerText = `Wins: ${winsCount}`;

  createElement("p", "count-of-loses", info);
  const loses = document.querySelector(".count-of-loses");
  loses.innerText = `Loses: ${losesCount}`;

  createElement("button", "button_avatar", info);
  const avatar = document.querySelector(".button_avatar");
  avatar.innerText = "Choose avatar";
}

const button = document.querySelector(".registration-field__button");

if (button) {
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
            usingAvatar: 1,
          },
        ])
      );

      body.innerHTML = "";
      createHomePage();
    }
  });
}
