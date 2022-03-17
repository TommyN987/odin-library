const library = [];

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
    this.info = function () {
      let readStatus;
      if (this.haveRead) {
        readStatus = 'has been read';
      } else
        readStatus = 'not read yet';
      return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    }
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theLittlePrince = new Book('The Little Prince', 'Antoine de Saint-Exupery', 123, true);

// console.log(theHobbit);
// console.log(theHobbit.info());

const addBook = (book) => {
  library.push(book);
}

addBook(theHobbit);
addBook(theLittlePrince);



const renderLibrary = () => {
  for (i = 0; i < library.length; i++) {
    console.log(library[i]);
  }
}

renderLibrary();