import React from 'react'
import styles from './book.module.css'

const book = ({cover_url, title}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={cover_url} width="100%" alt={title} />
      </div>
      <div className={styles.cardTitle}>{title}</div>
    </div>
  )
}

export default book