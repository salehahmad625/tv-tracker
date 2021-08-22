import {
  fetchShows,
  displayDropdown,
  clearDropdown,
  fetchSeasonEpisodeNumber,
} from "./searchAPI.js";

const searchedTitle = document.getElementById("search-bar");
const dropContent = document.getElementById("dropdown-content");

document.addEventListener("click", (event) => {
  const withinBoundaries = event.composedPath().includes(searchedTitle);
  const secondBoundary = event.composedPath().includes(dropContent);
  console.log(event.target);
  if (!withinBoundaries && !secondBoundary) {
    dropContent.style.display = "none";
  } else {
    dropContent.style.display = "block";
  }
});

searchedTitle.addEventListener("keyup", async (e) => {
  e.preventDefault();
  clearDropdown();
  await fetchShows(searchedTitle.value, []);
  console.log(dropContent);
});
