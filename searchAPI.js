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
  const info = "S" + `${season}` + "•" + "E" + `${episodes}`;
  return info;
}

function clearDropdown() {
  let node = document.getElementById("dropdown-content");
  node.querySelectorAll("*").forEach((n) => n.remove());
}

function displayDropdown(arr) {
  let dropContent = document.getElementById("dropdown-content");
  arr.forEach(async (show) => {
    const stuff = await fetchSeasonEpisodeNumber(show);

    let option = document.createElement("div");
    option.setAttribute("class", "option-div");

    option.addEventListener("click", (event) => {
      event.stopPropagation(); //stops propagation to document so the document click doesnt fire
      console.log(event.currentTarget);
      // dropContent.style.display = "none";
    });

    let pic = show.pic;
    let name = show.name;
    let data = show.id;

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

export { fetchShows, displayDropdown, clearDropdown, fetchSeasonEpisodeNumber };
