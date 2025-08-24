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

const zones = ["Head", "Neck", "Body", "Belly", "Legs"];
const zonesReverse = ["Head", "Neck", "Body", "Belly", "Legs"].reverse();
const zonesBuildPage = [...zones];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

if (!localStorage.getItem("character")) {
  createInitialPage();
} else {
  createHomePage();
}

function createElement(tag, nameForClass, elemForInsert) {
  const elem = document.createElement(tag);
  elem.classList.add(nameForClass);
  elemForInsert.append(elem);
  return elem;
}

function createInitialPage() {
  createElement("div", "registration-field", body);

  const registrationField = document.querySelector(".registration-field");
  const title = createElement(
    "h1",
    "registration-field__title",
    registrationField
  );
  title.innerText = "Create Your Character";

  const label = createElement(
    "label",
    "registration-field__label",
    registrationField
  );
  label.setAttribute("for", "registration-field__input");
  label.innerText = "Character Name";

  const input = createElement(
    "input",
    "registration-field__input-class",
    registrationField
  );
  input.setAttribute("type", "text");
  input.setAttribute("id", "registration-field__input");
  input.setAttribute("name", "name");
  input.setAttribute("required", "");
  input.setAttribute("minlength", "1");
  input.setAttribute("maxlength", "30");
  input.setAttribute("autocomplete", "off");
  input.focus();

  const button = createElement(
    "button",
    "registration-field__button",
    registrationField
  );
  button.innerText = "Create Character";

  const tooltip = createElement("div", "tooltip", body);
  tooltip.innerText = "Please, enter at least one character";
}

function createAvatarsPage() {
  let gamer = JSON.parse(localStorage.getItem("character"));
  console.log("hi");
  body.innerHTML = "";
  createCharacterPage();
  const avatar = document.querySelector(".button_avatar");

  if (avatar) {
    console.log("Hi again");
    avatar.addEventListener("click", () => {
      const background = createElement("div", "background", body);
      const select = createElement("div", "select-field", background);

      const cross = createElement("div", "cross", select);
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

      images.forEach((image) => {
        image.addEventListener("change", function () {
          const selectedImage = document.querySelector(".character-img");
          selectedImage.src = this.value;
        });
      });
    });
  }
}

function createHomePage() {
  let gamer = JSON.parse(localStorage.getItem("character"));

  const title = createElement("h1", "greeting_text", body);
  title.innerText = `Hi, ${gamer[0].name}!`;

  const button = createElement("button", "button_fight", body);
  button.innerText = "Fight!";

  button.addEventListener("click", () => {
    body.innerHTML = "";
    createFightPage();
  });

  const character = createElement("button", "button_character", body);
  character.innerText = "Character";

  character.addEventListener("click", createAvatarsPage);
}

function createCharacterPage() {
  let gamer = JSON.parse(localStorage.getItem("character"));
  const name = createElement("h1", "character-name", body);
  name.innerText = `Name: ${gamer[0].name}`;

  const page = createElement("div", "character-page", body);

  const img = createElement("img", "character-img", page);
  img.setAttribute("alt", "Character image 1");
  img.setAttribute("width", "480px");
  img.setAttribute("height", "540px");
  img.setAttribute("src", `${characters[gamer[0].usingAvatar - 1]}`);

  const info = createElement("div", "info-character", page);

  const wins = createElement("p", "count-of-wins", info);
  wins.innerText = `Wins: ${winsCount}`;

  const loses = createElement("p", "count-of-loses", info);
  loses.innerText = `Loses: ${losesCount}`;

  const avatar = createElement("button", "button_avatar", info);
  avatar.innerText = "Choose avatar";

  const edit = createElement("button", "button_edit", info);
  edit.innerText = "Edit name";

  const home = createElement("button", "button_home", info);
  home.innerText = "Home page";

  home.addEventListener("click", () => {
    body.innerHTML = "";
    createHomePage();
  });

  edit.addEventListener("click", changingName);
}

function changingName() {
  const background = createElement("div", "background", body);
  const edit = createElement("div", "edit-field", background);

  const cross = createElement("div", "cross", edit);
  createElement("span", "cross-span", cross);
  createElement("span", "cross-span", cross);

  cross.addEventListener("click", () => {
    background.remove();
  });

  const editField = createElement("p", "text-for-edit-field", edit);
  editField.innerText = "Please, enter new name";

  let gamer = JSON.parse(localStorage.getItem("character"));

  const input = createElement("input", "edit-input", edit);
  input.setAttribute("type", "text");
  input.setAttribute("name", "name");
  input.setAttribute("minlength", "1");
  input.setAttribute("maxlength", "30");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("value", `${gamer[0].name}`);
  input.focus();

  const save = createElement("button", "button_save", edit);
  save.innerText = "Save";

  let newName;

  input.addEventListener("change", (event) => {
    newName = event.target.value;
  });

  save.addEventListener("click", () => {
    gamer[0].name = newName;
    localStorage.setItem("character", JSON.stringify(gamer));
    const name = document.querySelector(".character-name");
    name.innerText = `Name: ${gamer[0].name}`;
  });
}

function createFightPage() {
  let gamer = JSON.parse(localStorage.getItem("character"));
  const enemies = gamer[1];

  let attackChecked;
  let defenseChecked;
  let attackItemsChecked;
  let defenseItemsChecked = [];
  let num = gamer[0].num;
  let characterHealthLeft = gamer[0].characterHealthLeft;
  let enemyHealthLeft = enemies.enemyArr[num].enemyHealthLeft;

  const header = createElement("div", "header", body);

  const home = createElement("button", "button_home-page", header);
  home.innerText = "Home page";

  home.addEventListener("click", () => {
    body.innerHTML = "";
    createHomePage();
  });

  const character = createElement("button", "button_character-page", header);
  character.innerText = "Character page";

  character.addEventListener("click", () => {
    body.innerHTML = "";
    createAvatarsPage();
  });

  const fight = createElement("div", "fight-block", body);

  const characterBlock = createElement("div", "character-block", fight);

  const characterName = createElement(
    "p",
    "character-name-fight",
    characterBlock
  );
  characterName.innerText = `${gamer[0].name}`;

  const img = createElement("img", "character-img", characterBlock);
  img.setAttribute("alt", `Character image ${gamer[0].usingAvatar - 1}`);
  img.setAttribute("width", "180px");
  img.setAttribute("height", "240px");
  img.setAttribute("src", `${characters[gamer[0].usingAvatar - 1]}`);

  const characterHealthCount = createElement(
    "p",
    "character-health-count",
    characterBlock
  );
  characterHealthCount.innerText = `${characterHealthLeft} / ${gamer[0].health}`;

  const health = createElement("progress", "health-line", characterBlock);
  health.setAttribute("max", "200");
  health.setAttribute("value", `${characterHealthLeft}`);

  health.style.border = "1px solid #000";

  const attack = createElement("div", "attack-block", fight);

  const text = createElement("p", "text-for-attack-block", attack);
  text.innerText = "Please pick 1 Attack zone and 2 Defense zones";

  const attackZones = createElement("div", "attack-zones", attack);

  const attackButton = createElement("button", "button_attack", attack);
  attackButton.innerText = "Attack!";

  const attackOptions = createElement("div", "attack-options", attackZones);

  const attackZonesTitle = createElement(
    "p",
    "text-for-attack-zones",
    attackOptions
  );
  attackZonesTitle.innerText = "Attack Zones";

  for (let i = 0; i < zonesBuildPage.length; i += 1) {
    const label = createElement("label", "attack-zone__label", attackOptions);
    label.setAttribute("for", `attack-input-${i + 1}`);
    label.innerText = `${zonesBuildPage[i]}`;

    const attackItems = createElement("input", "attack-input", label);
    attackItems.setAttribute("type", "radio");
    attackItems.setAttribute("id", `attack-input-${i + 1}`);
    attackItems.setAttribute("name", "attack-zone");
    attackItems.setAttribute("autocomplete", "off");
  }

  const defenseOptions = createElement("div", "defense-options", attackZones);

  const defenseZonesTitle = createElement(
    "p",
    "text-for-defense-zones",
    defenseOptions
  );
  defenseZonesTitle.innerText = "Defense Zones";

  for (let i = 0; i < zonesBuildPage.length; i += 1) {
    const label = createElement("label", "defense-zone__label", defenseOptions);
    label.setAttribute("for", `defense-input-${i + 1}`);
    label.innerText = `${zonesBuildPage[i]}`;

    const defenseItems = createElement("input", "defense-input", label);
    defenseItems.setAttribute("type", "checkbox");
    defenseItems.setAttribute("id", `defense-input-${i + 1}`);
  }

  const characterEnemyBlock = createElement("div", "character-block", fight);

  const characterEnemyName = createElement(
    "p",
    "character-name-fight",
    characterEnemyBlock
  );
  characterEnemyName.innerText = `${enemies.enemyArr[num].name}`;

  const imgEnemy = createElement("img", "enemy-img", characterEnemyBlock);
  imgEnemy.setAttribute("alt", `Character image ${num}`);
  imgEnemy.setAttribute("width", "180px");
  imgEnemy.setAttribute("height", "240px");
  imgEnemy.setAttribute("src", `${enemies.enemyArr[num].img}`);

  const characterEnemyHealth = createElement(
    "p",
    "character-enemy-health",
    characterEnemyBlock
  );
  characterEnemyHealth.innerText = `${enemyHealthLeft} / ${enemies.enemyArr[num].health}`;

  const healthEnemy = createElement(
    "progress",
    "health-line",
    characterEnemyBlock
  );

  let enemyHealth = enemies.enemyArr[num].health;
  healthEnemy.setAttribute("max", `${enemyHealth}`);
  healthEnemy.setAttribute("value", `${enemyHealthLeft}`);
  const separator = createElement("div", "separator", body);

  const process = createElement("div", "process-of-fight", body);
  process.innerHTML = gamer[0].process;

  const attackElements = document.querySelectorAll(".attack-input");
  const defenseElements = document.querySelectorAll(".defense-input");

  attackZones.addEventListener("click", (event) => {
    let defenseItemsChosen = [];
    if (event.target.tagName === "INPUT") {
      attackElements.forEach((el) => {
        if (el.checked) {
          gamer[0].attackItem = el.id.at(-1);
          attackChecked += 1;
        }
      });

      defenseElements.forEach((el) => {
        if (el.checked) {
          console.log(el.id);
          defenseItemsChosen.push(el.id.at(-1));
          defenseChecked += 1;
        }

        gamer[0].defenseItem = defenseItemsChosen;
      });
    }
    localStorage.setItem("character", JSON.stringify(gamer));
  });

  if (+gamer[0].attackItem !== 0) {
    attackElements[+gamer[0].attackItem - 1].checked = true;
  }

  if (gamer[0].defenseItem.length !== 0) {
    for (let i = 0; i < gamer[0].defenseItem.length; i += 1) {
      for (let j = 0; j <= defenseElements.length; j += 1) {
        if (+gamer[0].defenseItem[i] === j) {
          console.log(defenseElements[j - 1]);
          defenseElements[j - 1].checked = true;
        }
      }
    }
  }

  attackButton.addEventListener("click", () => {
    checkInputs();
  });

  function checkInputs() {
    attackChecked = 0;
    defenseChecked = 0;

    attackElements.forEach((el) => {
      if (el.checked) {
        attackChecked += 1;
      }
    });

    defenseElements.forEach((el) => {
      if (el.checked) {
        defenseChecked += 1;
      }
    });

    console.log(attackChecked, defenseChecked);

    if (attackChecked !== 1 || defenseChecked !== 2) {
      attackButton.style.boxShadow =
        "0px -1px 11px 23px rgba(255, 255, 255, 0.2), 0px -1px 11px 17px rgba(255, 67, 0, 0.2)";
      setTimeout(() => {
        attackButton.style.boxShadow = "none";
      }, 1000);
    } else {
      let fightArr = [];
      let defenseArr = [];
      fightArr = shuffle(zones);
      defenseArr = shuffle(zonesReverse);
      createFight(fightArr, defenseArr);
    }
  }

  function createFight(fightArr, defenseArr) {
    attackItemsChecked = "";
    defenseItemsChecked = [];

    let fightZones = fightArr.slice(0, enemies.enemyArr[num].attack.length);
    let defenseZones = defenseArr.slice(
      0,
      enemies.enemyArr[num].defense.length
    );

    const characterCurrentName = `${gamer[0].name}`;
    const enemyCurrentName = `${enemies.enemyArr[num].name}`;

    const attackElements = document.querySelectorAll(".attack-input");

    attackElements.forEach((el) => {
      if (el.checked) {
        attackItemsChecked = el.labels[0].innerText;
      }
    });

    const defenseElements = document.querySelectorAll(".defense-input");

    defenseElements.forEach((el) => {
      if (el.checked) {
        defenseItemsChecked.push(el.labels[0].innerText);
      }
    });

    if (defenseZones.includes(attackItemsChecked)) {
      process.innerHTML += `
      <span class='hero'>${characterCurrentName}</span> attacked <span class='enemy'>${enemyCurrentName}</span> to <span class='item'>${attackItemsChecked}</span> but <span class='enemy'>${enemyCurrentName}</span> was able to protect his <span class='item'>${attackItemsChecked}</span>.<br>
      `;
      gamer[0].process = process.innerHTML;
      localStorage.setItem("character", JSON.stringify(gamer));
    } else if (num === enemies.enemyArr[num].defense.length) {
      process.innerHTML += `
      <span class='hero'>${characterCurrentName}</span> attacked <span class='enemy'>${enemyCurrentName}</span> to <span class='item'>${attackItemsChecked}</span> and crit <span class='item'>${gamer[0].criticalDamage}</span> damage.<br>
      `;
      enemyHealthLeft -= gamer[0].criticalDamage;
      enemies.enemyArr[num].enemyHealthLeft = enemyHealthLeft;
      gamer[0].process = process.innerHTML;

      if (enemyHealthLeft <= 30) {
        healthEnemy.className = "low-health";
      } else {
        healthEnemy.className = "normal-health";
      }

      localStorage.setItem("character", JSON.stringify(gamer));
      healthEnemy.value = enemyHealthLeft;
      characterEnemyHealth.innerText = `${enemyHealthLeft} / ${enemies.enemyArr[num].health}`;
    } else {
      process.innerHTML += `
      <span class='hero'>${characterCurrentName}</span> attacked <span class='enemy'>${enemyCurrentName}</span> to <span class='item'>${attackItemsChecked}</span> and deal <span class='item'>${gamer[0].damage}</span> damage.<br>
      `;
      enemyHealthLeft -= gamer[0].damage;
      enemies.enemyArr[num].enemyHealthLeft = enemyHealthLeft;
      gamer[0].process = process.innerHTML;

      if (enemyHealthLeft <= 30) {
        healthEnemy.className = "low-health";
      } else {
        healthEnemy.className = "normal-health";
      }

      localStorage.setItem("character", JSON.stringify(gamer));
      healthEnemy.value = enemyHealthLeft;
      characterEnemyHealth.innerText = `${enemyHealthLeft} / ${enemies.enemyArr[num].health}`;
    }

    let array1 = fightZones;
    let array2 = defenseItemsChecked;

    for (let i = 0; i < array1.length; i += 1) {
      for (let j = 0; j < array2.length; j += 1) {
        if (array1[i] === "Head") {
          process.innerHTML += `
      <span class='enemy'>${enemyCurrentName}</span> attacked <span class='hero'>${characterCurrentName}</span> to <span class='item'>${array1[i]}</span> and crit <span class='item'>${enemies.enemyArr[num].criticalDamage}</span> damage.<br>
      `;
          characterHealthLeft -= enemies.enemyArr[num].criticalDamage;
          gamer[0].characterHealthLeft = characterHealthLeft;
          gamer[0].process = process.innerHTML;
          localStorage.setItem("character", JSON.stringify(gamer));
          characterHealthCount.innerText = `${characterHealthLeft} / ${gamer[0].health}`;
          health.value = characterHealthLeft;
          if (characterHealthLeft <= 30) {
            health.className = "low-health";
          } else {
            health.className = "normal-health";
          }

          break;
        } else if (array1[i] === array2[j]) {
          process.innerHTML += `
      <span class='enemy'>${enemyCurrentName}</span> attacked <span class='hero'>${characterCurrentName}</span> to <span class='item'>${array1[i]}</span> but <span class='enemy'>${characterCurrentName}</span> was able to protect his <span class='item'>${array1[i]}</span>.<br>
      `;
          gamer[0].process = process.innerHTML;
          localStorage.setItem("character", JSON.stringify(gamer));
          break;
        } else {
          process.innerHTML += `
      <span class='enemy'>${enemyCurrentName}</span> attacked <span class='hero'>${characterCurrentName}</span> to <span class='item'>${array1[i]}</span> and deal <span class='item'>${enemies.enemyArr[num].damage}</span> damage.<br>
      `;
          characterHealthLeft -= enemies.enemyArr[num].damage;
          gamer[0].enemyHealthLeft = characterHealthLeft;
          gamer[0].process = process.innerHTML;
          localStorage.setItem("character", JSON.stringify(gamer));
          health.value = characterHealthLeft;
          characterHealthCount.innerText = `${characterHealthLeft} / ${gamer[0].health}`;
          if (characterHealthLeft <= 30) {
            health.className = "low-health";
          } else {
            health.className = "normal-health";
          }

          break;
        }
      }
    }

    if (characterHealthLeft <= 0) {
      const background = createElement("div", "background", body);
      const result = createElement("div", "result-field", background);
      const resultInfo = createElement("p", "result-info", result);
      resultInfo.innerText = `${enemies.enemyArr[num].name} wins!`;

      const cross = createElement("div", "cross", result);
      createElement("span", "cross-span", cross);
      createElement("span", "cross-span", cross);

      losesCount += 1;

      cross.addEventListener("click", () => {
        enemyHealthLeft = enemies.enemyArr[num].health;
        enemies.enemyArr[num].enemyHealthLeft = enemyHealthLeft;
        gamer[0].characterHealthLeft = gamer[0].health;
        gamer[0].process = "";
        gamer[0].attackItem = 0;
        gamer[0].defenseItem = [];
        gamer[0].loses = losesCount;
        num = Math.floor(Math.random() * 7);
        gamer[0].num = num;
        localStorage.setItem("character", JSON.stringify(gamer));

        body.innerHTML = "";
        createHomePage();
      });
    }

    if (enemyHealthLeft <= 0) {
      const background = createElement("div", "background", body);
      const result = createElement("div", "result-field", background);
      const resultInfo = createElement("p", "result-info", result);
      resultInfo.innerText = `${gamer[0].name} wins!`;

      const cross = createElement("div", "cross", result);
      createElement("span", "cross-span", cross);
      createElement("span", "cross-span", cross);

      winsCount += 1;

      cross.addEventListener("click", () => {
        enemyHealthLeft = enemies.enemyArr[num].health;
        enemies.enemyArr[num].enemyHealthLeft = enemyHealthLeft;
        num = Math.floor(Math.random() * 7);
        gamer[0].num = num;
        gamer[0].process = "";
        gamer[0].attackItem = 0;
        gamer[0].defenseItem = [];
        gamer[0].wins = winsCount;
        gamer[0].characterHealthLeft = gamer[0].health;
        localStorage.setItem("character", JSON.stringify(gamer));

        body.innerHTML = "";
        createHomePage();
      });
    }
  }
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
            health: 200,
            characterHealthLeft: 200,
            damage: 10,
            criticalDamage: 15,
            num: Math.floor(Math.random() * 7),
            process: "",
            attackItem: 0,
            defenseItem: [],
            loses: 0,
            wins: 0,
          },
          {
            enemyArr: [
              {
                name: "Moldora",
                img: "./assets/img/enemy1.png",
                health: 150,
                enemyHealthLeft: 150,
                attack: ["Body"],
                defense: ["Body", "Legs", "Head"],
                damage: 15,
                criticalDamage: 20,
              },
              {
                name: "Meteo Wizzrobe",
                img: "./assets/img/enemy2.webp",
                health: 60,
                enemyHealthLeft: 60,
                attack: ["Head", "Neck"],
                defense: ["Legs"],
                damage: 10,
                criticalDamage: 15,
              },
              {
                name: "Fire-Breath Lizalfos",
                img: "./assets/img/enemy3.png",
                health: 40,
                enemyHealthLeft: 40,
                attack: ["Legs", "Body"],
                defense: ["Body"],
                damage: 5,
                criticalDamage: 10,
              },
              {
                name: "Guardian Stalker",
                img: "./assets/img/enemy4.png",
                health: 150,
                enemyHealthLeft: 150,
                attack: ["Head", "Neck", "Body"],
                defense: ["Body", "Neck"],
                damage: 15,
                criticalDamage: 20,
              },
              {
                name: "Monk Maz Koshia",
                img: "./assets/img/enemy5.jpg",
                health: 200,
                enemyHealthLeft: 200,
                attack: ["Body", "Belly", "Legs"],
                defense: ["Neck", "Body", "Belly"],
                damage: 20,
                criticalDamage: 25,
              },
              {
                name: "Waterblight Ganon",
                img: "./assets/img/enemy6.jpg",
                health: 200,
                enemyHealthLeft: 200,
                attack: ["Body", "Legs"],
                defense: ["Neck", "Belly"],
                damage: 20,
                criticalDamage: 25,
              },
              {
                name: "Calamity Ganon",
                img: "./assets/img/enemy7.jpg",
                health: 300,
                enemyHealthLeft: 300,
                attack: ["Head", "Body", "Legs"],
                defense: ["Head", "Body", "Neck", "Belly"],
                damage: 25,
                criticalDamage: 30,
              },
            ],
          },
        ])
      );

      body.innerHTML = "";
      createHomePage();
    }
  });
}
