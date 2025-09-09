"use strict";

import { element, render } from "./html-util.js";

// --- URL ---
const BASE_URL = "https://ihatov08.github.io";

const API_URLS = {
  all: "https://ihatov08.github.io/kimetsu_api/api/all.json",
  hashira: "https://ihatov08.github.io/kimetsu_api/api/hashira.json",
  oni: "https://ihatov08.github.io/kimetsu_api/api/oni.json",
  kisatsutai: "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json",
};

// --- DOMの参照 ---
const spinner = document.getElementById("js-spinner");
const characterList = document.getElementById("js-character-list");
const radios = document.getElementById("js-radios");
const categories = document.forms[0].elements["category"];

// --- API関連 ---
// APIのURLを取得する関数
const getApiUrl = () => API_URLS[categories.value];

/**
 * 非同期処理により対象データを取得する関数
 * 200番台以外のステータスコードが返ってきた場合は、エラーを投げる
 * @return {json}
 */
const fetchCharacters = async () => {
  const response = await fetch(getApiUrl());
  if (!response.ok) {
    throw new Error(
      `データを取得できませんでした（ステータスコード: ${response.status}）`
    );
  }
  return await response.json();
};

// --- UI関連 ---
// 画像のURLを取得する関数
const getImageUrl = (character) => BASE_URL + character.image;

/**
 * キャラクターのデータを受け取り、キャラクターカードのHTML要素を作成して返す関数
 * @param {json} character カードに表示させるキャラクターのデータ
 * @return {Element} キャラクターデータを反映したカードのHTML要素
 */
const createCard = (character) => element`
  <div class="col">
    <div class="card h-100 bg-dark shadow">
      <img
        src="${getImageUrl(character)}"
        class="card-img-top"
        alt="${character.name}"
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

const renderError = (message) => {
  const errorElement = element`
    <div class="alert alert-danger text-center w-100" role="alert">
      ${message}
    </div>
  `;
  render(errorElement, characterList);
};

/**
 * 取得したキャラクターデータを描画する関数
 * @param {json} characters 取得したキャラクターのデータ
 */
const renderCharacters = (characters) => {
  const fragment = document.createDocumentFragment();
  characters.forEach((character) =>
    fragment.appendChild(createCard(character))
  );
  render(fragment, characterList);
};

// スピナーを表示する関数
const showSpinner = () => spinner.classList.remove("d-none");
// スピナーを非表示にする関数
const hideSpinner = () => spinner.classList.add("d-none");

// --- メイン処理 ---
const loadCharacters = async () => {
  showSpinner();
  try {
    const characters = await fetchCharacters();
    renderCharacters(characters);
  } catch (error) {
    console.error(error.message); // コンソール出力
    renderError(error.message); // 画面出力
  } finally {
    hideSpinner();
  }
};

// --- 画面の初期表示 ---
loadCharacters();

// --- カテゴリー選択時の表示 ---
radios.addEventListener("change", loadCharacters);
