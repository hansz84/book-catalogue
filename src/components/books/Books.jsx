import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/app-context";
import Book from "../book/Book";
import Pagination from "../pagination/Pagination";
import styles from "./books.module.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const appCtx = useContext(AppContext);

  const size = 10;

  const handlePagination = (current) => {
    setCurrentPage(current);
    let endSize = books.length < size ? books.length : current * size;
    setCurrentBooks(books.slice((current - 1) * size, endSize));
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
          setTotalPages(Math.ceil(data.length / size));
          let endSize = books.length < size ? books.length : currentPage * size;
          setCurrentBooks(books.slice((currentPage - 1) * size, endSize));
        })
        .catch((error) => console.log(error));

      appCtx.reload = false;
    }
  }, [appCtx, currentPage, totalPages]);

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
        {currentBooks.length > 0 &&
          currentBooks.map((book) => <Book key={book.id} book={book} />)}
      </div>
      {currentBooks.length > 0 && (
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
