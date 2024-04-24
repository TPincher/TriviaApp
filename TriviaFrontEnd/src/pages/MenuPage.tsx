import Card from "../components/Card/Card";
import styles from "./MenuPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { useEffect, useState } from "react";
import { fetchCategories, fetchQuestion } from "../services/triviaAPI";
import { updateDifficulty } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const MenuPage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
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

  const questionFetcher = () => {
    console.log(fetchQuestion("&category=19"));
  };

  const handleDifficultySelect = (difficulty: String) => {
    dispatch(updateDifficulty(difficulty));
    console.log(storeDifficulty);
  };

  return (
    <main className={pageStyles.allPages}>
      <section className={styles.difficultySection}>
        {difficulties.map((difficulty) => {
          return (
            <Card
              text={difficulty}
              action={setSelectedDifficulty}
              onClick={() => handleDifficultySelect(difficulty)}
            />
          );
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
