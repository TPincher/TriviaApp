import Card from "../components/Card/Card";
import styles from "./MenuPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { useEffect, useState } from "react";
import { fetchCategories, fetchQuestion } from "../services/triviaAPI";

const MenuPage = () => {
  const difficulties: string[] = ["easy", "medium", "hard", "all"];
  const [selectedDifficulty, setSelectedDifficulty] = useState("none selected");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories().then((data: any) => setCategoryList(data));
  }, []);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedDifficulty, selectedCategory]);

  console.log(categoryList);

  const questionFetcher = () => {
    console.log(fetchQuestion("&category=19"));
  };

  return (
    <main className={pageStyles.allPages}>
      <section className={styles.difficultySection}>
        {difficulties.map((difficulty) => {
          return <Card text={difficulty} action={setSelectedDifficulty} />;
        })}
        <p>Game difficulty: {selectedDifficulty}</p>
      </section>
      <section className={styles.categorySection}>
        {categoryList.map((category) => {
          return (
            <Card
              text={category.category}
              categoryID={category.fetchID}
              data={selectedCategory}
              action={setSelectedCategory}
            />
          );
        })}
      </section>
      <p>Question category: {selectedCategory}</p>
      <section className={styles.buttonSection}>
        <button onClick={questionFetcher}>Get Question</button>
      </section>
    </main>
  );
};

export default MenuPage;
