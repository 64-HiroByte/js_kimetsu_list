const url = "https://ihatov08.github.io/kimetsu_api/api/all.json";

// fetchでAPIを叩く（リクエストを送る）
// fetch(url)
//   .then((response) => response.json()) // JSONデータに変換
//   .then((data) => {
//     // dataにキャラの一覧が入ってくる
//     console.log(data);

//     const list = document.getElementById("character-list");

//     // 例えば名前だけ表示する
//     data.forEach((character) => {
//       const li = document.createElement("li");
//       li.textContent = character.name; // キャラ名
//       list.appendChild(li);
//     });
//   })
//   .catch((error) => {
//     console.error("エラー:", error);
//   });
