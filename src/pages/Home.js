import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "../components/Book";
import { filterBooksByShelf, getImageUrl, shelves } from "../utils/Utils";

const Home = (props) => {
  const { bookList, handleChange } = props;

  return (
    <div className="list-books">
      <div className="book-shelf">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <div key={shelf.id} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {filterBooksByShelf(bookList, shelf.shelfName) &&
                      filterBooksByShelf(bookList, shelf.shelfName).map(
                        (book) => (
                          <li key={book.id}>
                            <Book
                              book={book}
                              bookTitle={book.title}
                              author={book.authors}
                              bookShelf={book.shelf}
                              imgURL={getImageUrl(book.imageLinks)}
                              handleChange={handleChange}
                            />
                          </li>
                        )
                      )}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default Home;

Home.propTypes = {
  bookList: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
};
