const addButton = document.querySelector("#add");
const dialog = document.querySelector("dialog");
const librarySection = document.querySelector(".card-grid");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const readButtonInput = document.querySelector("#read");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");


addButton.addEventListener("click", () => {
  toggleDialogDiplay();
})

dialog.addEventListener("click", (e) => {
  if (e.target === dialog){
    toggleDialogDiplay();
  }
})

function toggleDialogDiplay() {
  if (dialog.style.display === "flex"){
    dialog.style.display = "none";
  } else {
    dialog.style.display = "flex"
  }
}

const library = [];

function Book(author, title, pages, read){
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  const bookToAdd = new Book(author, title, pages, read)
  library.push(bookToAdd);
}

// Create placeholders
addBookToLibrary("test1", "title1", 110, true);
addBookToLibrary("test2", "title2", 120, false);
addBookToLibrary("test3", "title3", 130, true);
addBookToLibrary("test4", "title4", 140, false);

function addBooksToLibrary() {
  // Not so sure if should comment this
  // Clear all sections's children 
  librarySection.replaceChildren();

  // Create element that represents book
  for (let book of library) {
    const article = document.createElement("article");

    const titleH2 = document.createElement("h2");
    titleH2.textContent = book.title;
    
    const authorP = document.createElement("p");
    authorP.textContent = book.author;

    const pagesP = document.createElement("p");
    pagesP.textContent = book.pages;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("actions");
    
    const readButton = document.createElement("button");
    readButton.textContent = "read";
    if (!(book.read)) readButton.classList.add("not-read");
    readButton.addEventListener("click", () => {
      toggleBtnBgColor(readButton);
    })

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X"

    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(deleteButton);
    article.appendChild(titleH2);
    article.appendChild(authorP);
    article.appendChild(pagesP);
    article.appendChild(buttonsDiv);
    librarySection.appendChild(article);
  }
}

// Add placeholders
addBooksToLibrary();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = authorInput.value;
  const title = titleInput.value;
  const pages = pagesInput.value;
  const read = !(readButtonInput.classList.contains("not-read"));

  addBookToLibrary(author, title, pages, read);
  addBooksToLibrary();
  toggleDialogDiplay();

  form.reset();
  readButtonInput.classList.remove("not-read");
})

readButtonInput.addEventListener("click", () => {
  toggleBtnBgColor(readButtonInput);
})

function toggleBtnBgColor(button){
  button.classList.toggle("not-read");
}