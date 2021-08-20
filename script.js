import {
  fetchShows,
  displayDropdown,
  clearDropdown,
  fetchSeasonEpisodeNumber,
} from "./searchAPI.js";

let showsArr = [];

//let myLibrary = [];

// const form = document.getElementById("myForm");
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   let title = document.getElementById("formTitle").value;
//   let finished = 0;
//   if (document.getElementById("formFinished").checked) {
//     finished = document.getElementById("formFinished").value;
//   } else {
//     finished = document.getElementById("stillWatching").value;
//   }
//   const newShow = new Show(title, finished);
//   document.querySelector(".bg-modal").style.display = "none";
//   addShowToLibrary(newShow);
//   populateCards(myLibrary);
// });

const searchedTitle = document.getElementById("search-bar");
searchedTitle.addEventListener("keyup", (e) => {
  e.preventDefault();
  showsArr = [];
  clearDropdown();
  let name = searchedTitle.value;
  console.log(name);
  console.log(fetchShows(name, showsArr));
});

/*form.addEventListener("submit", (e) => {
  e.preventDefault();
});*/
