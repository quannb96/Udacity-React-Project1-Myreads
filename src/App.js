import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await BooksAPI.getAll();
        setBookList(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleChange = (shelf, book) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBookList([...bookList.filter((b) => b.id !== book.id), book]);
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={<Home bookList={bookList} handleChange={handleChange} />}
        />
        <Route
          path="/search"
          element={<Search bookList={bookList} handleChange={handleChange} />}
        />
      </Routes>
    </div>
  );
}

export default App;
