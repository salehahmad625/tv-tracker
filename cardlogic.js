class Show {
  constructor(title, read) {
    this.title = title;
    this.read = read;
  }
  info() {
    return `${this.title}, ${this.read}`;
  }
}

function addShowToLibrary(show, libArr) {
  libArr.push(show);
}

function removeShow(num, libArr) {
  libArr.splice(num, 1);
  populateCards(libArr);
}

function populateCards(arr) {
  let node = document.querySelector(".card-container");
  node.querySelectorAll("*").forEach((n) => n.remove());

  for (let i = 0; i < arr.length; i++) {
    const cont = document.querySelector(".card-container");

    const card = document.createElement("div");
    card.setAttribute("data", `${i}`);
    card.setAttribute("class", "card");

    const title = document.createElement("h3");
    title.setAttribute("class", "title");
    title.textContent = arr[i].title;

    const read = document.createElement("button");
    read.setAttribute("class", "card-button");
    read.setAttribute("id", "status");
    if (arr[i].read.toLowerCase() !== "finished") {
      read.classList.add("class", "unread");
      read.textContent = "Still watching";
    } else {
      read.textContent = "Finished";
    }
    read.addEventListener("click", () => {
      read.classList.toggle("unread");
      if (read.classList.contains("unread")) {
        read.textContent = "Still watching";
      } else {
        read.textContent = "Finished";
      }
    });

    const remove = document.createElement("div");
    remove.setAttribute("class", "card-remove");
    remove.textContent = "+";
    remove.addEventListener("click", () => {
      removeShow(i);
    });

    card.appendChild(remove);
    card.appendChild(title);
    card.appendChild(read);

    cont.appendChild(card);
  }
}
