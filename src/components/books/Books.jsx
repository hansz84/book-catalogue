import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/app-context";
import Book from "../book/Book";
import Pagination from "../pagination/Pagination";
import styles from "./books.module.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [state, setState] = useState({
    totalPages: 0,
    currentPage: 0,
  });
  const appCtx = useContext(AppContext);

  const size = 10;
  const { totalPages, currentPage } = state;

  const handlePagination = (current) => {
    setState({ ...state, currentPage: current });
  };

  useEffect(() => {
    if (appCtx.reload && appCtx.categoryId > 0) {
      fetch(
        "/api/fee-assessment-books?" +
          new URLSearchParams({
            categoryId: appCtx.categoryId,
          })
      )
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          setState({ ...state, totalPages: Math.ceil(data.length / size) });
        })
        .catch((error) => console.log(error));

      appCtx.reload = false;
    }
  }, [appCtx, state]);

  return (
    <>
      {books.length > 0 && (
        <div>
          <input
            className={styles.bookSearch}
            type="text"
            placeholder="type here to search for book..."
          />
        </div>
      )}
      <div className={styles.container}>
        {books.length <= 0 && (
          <p>Please click on category above to view books.</p>
        )}
        {books && books.map((book) => <Book key={book.id} book={book} />)}
      </div>
      {books.length > 0 && (
        <Pagination
          total={totalPages}
          current={currentPage}
          pagination={(crPage) => handlePagination(crPage)}
        />
      )}
    </>
  );
};

export default Books;
