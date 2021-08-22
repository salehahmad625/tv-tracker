import * as search from "./searchAPI.js";

const searchedTitle = document.getElementById("search-bar");
const dropContent = document.getElementById("dropdown-content");
const closeInfo = document.querySelector(".close");
const modal = document.querySelector(".bg-modal");

document.addEventListener("click", (event) => {
  const withinBoundaries = event.composedPath().includes(searchedTitle);
  const secondBoundary = event.composedPath().includes(dropContent);
  // console.log(event.target);
  if (!withinBoundaries && !secondBoundary) {
    dropContent.style.display = "none";
  } else {
    dropContent.style.display = "block";
  }
});

searchedTitle.addEventListener("keyup", async (e) => {
  e.preventDefault();
  search.clearDropdown();
  await search.fetchShows(searchedTitle.value, []);
  console.log(dropContent);
});

closeInfo.addEventListener("click", () => {
  modal.style.display = "none";
});
