import * as search from "./searchAPI.js";

function addShowToLibrary(show, libArr) {
  libArr.push(show);
}

function removeShow(id, libArr) {
  for (let i = 0; i < libArr.length; i++) {
    if (libArr[i].id == id) {
      libArr.splice(i, 1);
    }
  }
  // libArr.splice(num, 1);
}

function addCardToDisplay(obj, arr) {
  const cont = document.querySelector(".card-container");

  const card = document.createElement("div");
  card.setAttribute("data", `${obj.name}`);
  card.setAttribute("class", "card");

  const cardContent = document.createElement("div");
  cardContent.setAttribute("class", "card-content");

  const title = document.createElement("h3");
  title.setAttribute("class", "card-title");
  title.textContent = obj.name;

  const img = document.createElement("img");
  img.setAttribute("src", obj.pic);
  img.setAttribute("class", "card-pic");

  img.addEventListener("click", (e) => {
    console.log(e.target);
    console.log(obj.id);
    search.fetchShowInfo(obj.id);
  });

  const channel = document.createElement("span");
  channel.setAttribute("class", "card-channel");
  channel.textContent = obj.service;

  const remove = document.createElement("div");
  remove.setAttribute("class", "card-remove");
  remove.textContent = "+";
  remove.addEventListener("click", () => {
    console.log(arr);
    removeShow(obj.id, arr);
    console.log(arr);
    card.remove();
  });

  cardContent.appendChild(remove);
  cardContent.appendChild(title);
  cardContent.appendChild(img);
  cardContent.appendChild(channel);

  card.appendChild(cardContent);

  cont.appendChild(card);
}

export { removeShow, addShowToLibrary, addCardToDisplay };
