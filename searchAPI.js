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
      });
    }
  });
  displayDropdown(arr);
  return arr;
}

function clearDropdown() {
  let node = document.getElementById("dropdown-content");
  node.querySelectorAll("*").forEach((n) => n.remove());
}

function displayDropdown(arr) {
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

    option.appendChild(image);
    option.appendChild(title);

    dropContent.appendChild(option);
  });
}

export { fetchShows, displayDropdown, clearDropdown };
