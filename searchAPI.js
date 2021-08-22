import * as cards from "./cardlogic.js";

let myShows = [];

class Show {
  constructor(name, pic, summary, service, id) {
    this.name = name;
    this.pic = pic;
    this.summary = summary;
    this.service = service;
    this.id = id;
  }
}

async function fetchShows(name, arr) {
  const response = await fetch("https://api.tvmaze.com/search/shows?q=" + name);
  const showList = await response.json();
  showList.forEach((item) => {
    if (item.show.image !== null) {
      arr.push({
        name: item.show.name,
        pic: item.show.image.medium,
        id: item.show.id,
      });
    }
  });
  displayDropdown(arr);
  return arr;
}

async function fetchShowInfo(id) {
  const response = await fetch("https://api.tvmaze.com/shows/" + id);
  const showInfo = await response.json();
  let info = [];
  info.push({
    name: showInfo.name,
    pic: showInfo.image.medium,
    summary: showInfo.summary,
    service:
      showInfo.network == null
        ? showInfo.webChannel.name
        : showInfo.network.name,
    id: showInfo.id,
  });
  displayInfo(info, myShows);
  return info;
}

function displayInfo(infoArr, showsArr) {
  const modal = document.querySelector(".bg-modal");
  // modal.style.display = "flex";
  const modalContent = document.querySelector(".modal-content");

  const name = document.querySelector(".info-name");
  name.textContent = infoArr[0].name;

  const pic = document.querySelector(".info-pic");
  pic.setAttribute("src", infoArr[0].pic);

  const summary = document.querySelector(".info-summary");
  summary.innerHTML = infoArr[0].summary.slice(
    3,
    infoArr[0].summary.length - 4
  );

  const service = document.querySelector(".info-service");
  service.textContent = "Watch on: " + infoArr[0].service;

  let exists = false;
  for (let show of showsArr) {
    if (show.id == infoArr[0].id) {
      exists = true;
    }
  }
  if (!exists) {
    const addShow = document.createElement("button");
    addShow.setAttribute("class", "add-show");
    addShow.textContent = "Add Show+";
    modalContent.appendChild(addShow);

    addShow.addEventListener("click", () => {
      const show = new Show(
        infoArr[0].name,
        infoArr[0].pic,
        infoArr[0].summary,
        infoArr[0].service,
        infoArr[0].id
      );
      cards.addShowToLibrary(show, showsArr);
      console.log(showsArr);
      cards.addCardToDisplay(show, showsArr);
      modal.style.display = "none";
      addShow.remove();
    });
  }
  modal.style.display = "flex";
}

async function fetchSeasonEpisodeNumber(obj) {
  const response = await fetch(
    "https://api.tvmaze.com/shows/" + `${obj.id}` + "/seasons"
  );
  const seasonList = await response.json();
  const season = seasonList[seasonList.length - 1].number;
  const episodes = seasonList[seasonList.length - 1].episodeOrder;
  const info = "S" + `${season}` + "•" + "E" + `${episodes}`;
  return info;
}

function clearDropdown() {
  let node = document.getElementById("dropdown-content");
  node.querySelectorAll("*").forEach((n) => n.remove());
}

function displayDropdown(arr) {
  let dropContent = document.getElementById("dropdown-content");
  let modal = document.querySelector(".bg-modal");

  arr.forEach(async (show) => {
    const stuff = await fetchSeasonEpisodeNumber(show);

    let pic = show.pic;
    let name = show.name;
    let data = show.id;

    let option = document.createElement("div");
    option.setAttribute("class", "option-div");

    option.addEventListener("click", (event) => {
      event.stopPropagation(); //stops propagation to document so the document click doesnt fire
      console.log(event.currentTarget);
      dropContent.style.display = "none";
      // modal.style.display = "flex";
      fetchShowInfo(data);
    });

    option.setAttribute("id", name);
    option.setAttribute("data", data);

    let image = document.createElement("img");
    image.setAttribute("src", pic);
    image.setAttribute("class", "option-img");

    let desc = document.createElement("div");
    desc.setAttribute("class", "option-desc");

    let title = document.createElement("span");
    title.textContent = name;
    title.setAttribute("class", "option-title");

    let info = document.createElement("span");
    info.textContent = stuff;
    info.setAttribute("class", "option-info");

    desc.appendChild(title);
    desc.appendChild(info);

    option.appendChild(image);
    option.appendChild(desc);

    dropContent.appendChild(option);
  });
}

export {
  fetchShows,
  displayDropdown,
  clearDropdown,
  fetchSeasonEpisodeNumber,
  fetchShowInfo,
  displayInfo,
};
