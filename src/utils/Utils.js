export const shelves = [
  { id: 0, title: "Currently Reading", shelfName: "currentlyReading" },
  { id: 1, title: "Want to Read", shelfName: "wantToRead" },
  { id: 2, title: "Read", shelfName: "read" },
];

export const filterBooksByShelf = (books, shelfName) => {
  return books && books.filter((book) => book && book.shelf === shelfName);
};

export const getImageUrl = (imageLinks) => {
  return imageLinks && imageLinks.smallThumbnail;
};

export const setShelves = (searchedBookList, bookList) => {
  return searchedBookList.map((book) => {
    const foundBook = bookList.find((b) => b.id === book.id);
    return { ...book, shelf: foundBook ? foundBook.shelf : "none" };
  });
};
