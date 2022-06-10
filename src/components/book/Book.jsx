import React from "react";
import styles from "./book.module.css";

const book = ({ book }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={book.cover_url} width="100%" alt={book.title} />
      </div>
      <div className={styles.cardTitle}>{book.title}</div>
      <div className={styles.cardAuthor}>{book.authors.join(", ")}</div>
    </div>
  );
};

export default book;
