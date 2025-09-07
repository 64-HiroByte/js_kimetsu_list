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

const fetchCharactor = async () => {
  const apiUrl = getApiUrl();
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `データを取得できませんでした（ステータスコード: ${response.status}）`
      );
    }
    const charactors = await response.json();

    charactors.forEach((charactor) => {
      console.log("画像: ", getImageUrl(charactor));
      console.log("カテゴリー: ", charactor.category);
      console.log("名前: ", charactor.name);
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    spinner.classList.add("d-none");
  }
};

fetchCharactor();

const radios = document.getElementById("js-radio-selector");
radios.addEventListener("change", fetchCharactor);
