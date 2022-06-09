import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/app-context";
import styles from "./tags.module.css";

const Tags = () => {
  const [categories, setCategories] = useState([]);
  const appCtx = useContext(AppContext);

  useEffect(() => {
    fetch("/api/fee-assessment-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (id) => {
    appCtx.setCategoryId(id);
  }

  return (
    <div className={styles.tags}>
      {categories &&
        categories.map((category) => (
          <span className={styles.tagItem} key={category.id} onClick={() => handleClick(category.id)}>
            {category.name}
          </span>
        ))}
    </div>
  );
};

export default Tags;
