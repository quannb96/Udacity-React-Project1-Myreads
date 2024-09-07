import PropTypes from "prop-types";
import { shelves } from "../utils/Utils";

const Book = (props) => {
  const {
    book,
    bookTitle,
    author,
    imgURL,
    bookShelf,
    handleChange,
    isSearching,
  } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imgURL}")`,
          }}
        ></div>

        <div className="book-shelf-changer">
          <select
            onChange={(e) => handleChange(e.target.value, book)}
            value={bookShelf}
          >
            <option value="none" disabled>
              {isSearching ? "Add to..." : "Move to..."}
            </option>
            {shelves.map((shelf) => (
              <option key={shelf.id} value={shelf.shelfName}>
                {shelf.title}
              </option>
            ))}
            {!isSearching && <option value="none">None</option>}
          </select>
        </div>
      </div>
      <div className="book-title">{bookTitle}</div>
      <div className="book-authors">{author && author.join(", ")}</div>
    </div>
  );
};

export default Book;

Book.propTypes = {
  book: PropTypes.object.isRequired,
  bookTitle: PropTypes.string.isRequired,
  author: PropTypes.array,
  imgURL: PropTypes.string,
  bookShelf: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
};
