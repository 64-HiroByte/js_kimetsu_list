import { element, render } from "./html-util.js";

const BASE_URL = "https://ihatov08.github.io";

const API_URLS = {
  all: "https://ihatov08.github.io/kimetsu_api/api/all.json",
  hashira: "https://ihatov08.github.io/kimetsu_api/api/hashira.json",
  oni: "https://ihatov08.github.io/kimetsu_api/api/oni.json",
  kisatsutai: "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json",
};

const categories = document.forms[0].elements["category"];

// APIのURLを取得
const getApiUrl = () => {
  const category = categories.value;
  return API_URLS[category];
};

const getImageUrl = (res) => {
  return BASE_URL + res.image;
};

const createElement = (character) => {
  return element`
    <div class="col">
      <div class="card h-100 bg-dark shadow">
        <img
          src="${getImageUrl(character)}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title text-center text-warning fst-italic">
            ${character.category}
          </h5>
          <h4 class="card-title text-center text-light fw-bold mt-3 mb-4">
            ${character.name}
          </h4>
        </div>
      </div>
    </div>
  `;
};

const fetchcharacter = async () => {
  const apiUrl = getApiUrl();
  const spinner = document.getElementById("js-spinner");
  spinner.classList.remove("d-none");
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `データを取得できませんでした（ステータスコード: ${response.status}）`
      );
    }
    const characters = await response.json();

    const characterList = document.getElementById("js-character-list");

    const fragment = document.createDocumentFragment();

    characters.forEach((character) => {
      const characterElement = createElement(character);
      fragment.appendChild(characterElement);
    });
    render(fragment, characterList);
  } catch (error) {
    console.error(error.message);
  } finally {
    spinner.classList.add("d-none");
  }
};

fetchcharacter();

const radios = document.getElementById("js-radios");
radios.addEventListener("change", fetchcharacter);
