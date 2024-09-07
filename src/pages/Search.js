import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import Book from "../components/Book";
import { getImageUrl, setShelves } from "../utils/Utils";

const Search = ({ handleChange, bookList }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedBookList, setSearchedBookList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchText.trim() !== "") {
        try {
          const searchedBooks = await BooksAPI.search(searchText);
          if (searchedBooks.error) {
            setSearchedBookList([]);
          } else {
            const updatedSearchedBookList = setShelves(searchedBooks, bookList);
            setSearchedBookList(updatedSearchedBookList);
          }
        } catch (error) {
          console.log("SearchError:", error);
          setSearchedBookList([]);
        }
      } else {
        setSearchedBookList([]);
      }
    };

    fetchData();
  }, [bookList, searchText]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <NavLink className="close-search" to="/">
          Close
        </NavLink>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchText}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      </div>

      {searchText && (
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBookList.map((book, key) => (
              <li key={key}>
                <Book
                  book={book}
                  bookTitle={book.title}
                  author={book.authors}
                  bookShelf={book.shelf}
                  imgURL={getImageUrl(book.imageLinks)}
                  handleChange={handleChange}
                  isSearching={true}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Search;

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  bookList: PropTypes.array.isRequired,
};
