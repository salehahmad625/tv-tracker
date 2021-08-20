async function fetchShows(title, arr) {
  const response = await fetch(
    "https://api.tvmaze.com/search/shows?q=" + title
  );
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

async function fetchSeasonEpisodeNumber(obj) {
  const response = await fetch(
    "https://api.tvmaze.com/shows/" + `${obj.id}` + "/seasons"
  );
  const seasonList = await response.json();
  const season = seasonList[seasonList.length - 1].number;
  const episodes = seasonList[seasonList.length - 1].episodeOrder;
  const info = "S" + `${season}` + " " + "E" + `${episodes}`;
  return info;
}

function clearDropdown() {
  let node = document.getElementById("dropdown-content");
  node.querySelectorAll("*").forEach((n) => n.remove());
}

async function displayDropdown(arr) {
  let dropContent = document.getElementById("dropdown-content");
  arr.forEach((show) => {
    let option = document.createElement("div");
    option.setAttribute("class", "option-div");

    let pic = show.pic;
    let name = show.name;

    option.setAttribute("id", name);

    let image = document.createElement("img");
    image.setAttribute("src", pic);
    image.setAttribute("class", "option-img");

    let title = document.createElement("h3");
    title.textContent = name;
    title.setAttribute("class", "option-title");

    let info = document.createElement("h3");
    info.textContent = season;
    info.setAttribute("class", "option-info");

    option.appendChild(image);
    option.appendChild(title);
    option.appendChild(info);

    dropContent.appendChild(option);
  });
}

export { fetchShows, displayDropdown, clearDropdown, fetchSeasonEpisodeNumber };
