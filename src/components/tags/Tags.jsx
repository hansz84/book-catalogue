import React, { useEffect, useState } from "react";
import styles from "./tags.module.css";

const Tags = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/fee-assessment-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.tags}>
      {categories &&
        categories.map((category) => (
          <span className={styles.tagItem} key={category.id}>
            {category.name}
          </span>
        ))}
    </div>
  );
};

export default Tags;
