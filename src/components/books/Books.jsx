import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../store/app-context'
import Book from '../book/Book'
import styles from './books.module.css'

const Books = () => {
  const [books, setBooks] = useState([])
  const appCtx = useContext(AppContext)

  useEffect(() => {
    if (appCtx.categoryId > 0) {
      fetch("/api/fee-assessment-books?" + new URLSearchParams({ categoryId: appCtx.categoryId, page: 0, size: 10}))
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((error) => console.log(error))
    }
  }, [appCtx.categoryId])

  return (
    <div className={styles.container}>
      {!books && <p>Please click on category above to view books.</p>}  
      {books && books.map(book => (<Book key={book.id} book={book} />))}
    </div>
  )
}

export default Books