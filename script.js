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

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

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

    const title = document.createElement("h3");
    title.setAttribute("class", "title");
    title.textContent =  arr[i].title;

    const author = document.createElement("div");
    author.setAttribute("class", "author");
    author.textContent = "By: " + arr[i].author;

    const pages = document.createElement("div");
    pages.setAttribute("class", "pages");
    pages.textContent = arr[i].pages + " pages";

    const read = document.createElement("button");
    read.setAttribute("class", "card-button");
    read.setAttribute("id", 'status');
    if(arr[i].read.toLowerCase() !== 'finished')
    {
      read.classList.add("class","unread");
      read.textContent = 'Still reading'
    }
    else {
      read.textContent = 'Finished'
    }
    read.addEventListener('click', () => {
      read.classList.toggle('unread');
      if(read.classList.contains('unread'))
      {
        read.textContent = 'Still reading';
      }
      else {
        read.textContent = 'Finished';
      }
    })

    const remove = document.createElement("button");
    remove.setAttribute("class", "card-button");
    remove.setAttribute("id", "remove");
    remove.textContent = "Remove";
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

populateCards(myLibrary);

addBook.addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'flex';
});

const closePopUp = document.querySelector('.close');

closePopUp.addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});

const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
  event.preventDefault();
  let title = document.getElementById('formTitle').value;
  let author = document.getElementById('formAuthor').value;
  let pages = document.getElementById('formPages').value;
  let finished = 0;
  if(document.getElementById('formFinished').checked) {
    finished = document.getElementById('formFinished').value;
  } 
  else {
    finished = document.getElementById('stillReading').value;
  }
  const bookie = new Book(title,author,pages,finished);
  document.querySelector('.bg-modal').style.display = 'none';
  addBookToLibrary(bookie);
  populateCards(myLibrary);
});