function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

let myLibrary = [];

const harry = new Book("harry potter", "jk rowlling", 500, "not read");
const percy = new Book("percy jackson", "rick riordan", 250, "read");
const hunger = new Book("hunger games", "susan collines", 300, "not read");

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}
addBookToLibrary(harry);
addBookToLibrary(percy);
addBookToLibrary(hunger);

function removeBook(num) {
  myLibrary.splice(num, 1);
  populateCards(myLibrary);
}

function populateCards(arr) {
  let node = document.querySelector(".card-container");
  node.querySelectorAll("*").forEach((n) => n.remove());

  for (let i = 0; i < arr.length; i++) {
    const cont = document.querySelector(".card-container");

    const card = document.createElement("div");
    card.setAttribute("data", `${i}`);
    card.setAttribute("class", "card");

    const title = document.createElement("div");
    title.setAttribute("class", "title");
    title.textContent = "Title: " + arr[i].title;

    const author = document.createElement("div");
    author.setAttribute("class", "author");
    author.textContent = "Author: " + arr[i].author;

    const pages = document.createElement("div");
    pages.setAttribute("class", "pages");
    pages.textContent = "Pages: " + arr[i].pages;

    const read = document.createElement("div");
    read.setAttribute("class", "read");
    read.textContent = arr[i].read;

    const remove = document.createElement("button");
    remove.setAttribute("class", "remove");
    remove.textContent = "X";
    remove.addEventListener("click", () => {
      removeBook(i);
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(remove);

    cont.appendChild(card);
  }
}

const addBook = document.querySelector("#add");

addBook.addEventListener("click", () => {
  let boo = prompt("Name of book?");
  let name = prompt("Name of author?");
  let pages = parseInt(prompt("Number of pages?"));
  let status = prompt("Read or not read yet?");

  const bookie = new Book(boo, name, pages, status);
  addBookToLibrary(bookie);
  populateCards(myLibrary);
});

populateCards(myLibrary);
