import Card from "../components/Card/Card";
import styles from "./MenuPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { useEffect, useState } from "react";
import { fetchCategories, fetchQuestion } from "../services/triviaAPI";
import { updateCategory, updateDifficulty } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MenuPage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
  const difficulties: string[] = ["easy", "medium", "hard", "all"];
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories().then((data: any) => setCategoryList(data));
  }, []);

  const questionFetcher = () => {
    console.log(fetchQuestion("&category=19"));
  };

  const handleDifficultySelect = (difficulty: String) => {
    dispatch(updateDifficulty(difficulty));
    console.log(storeDifficulty);
  };

  const handleCategorySelect = (category: String) => {
    dispatch(updateCategory(category));
    console.log(storeCategory);
  };

  return (
    <main className={pageStyles.allPages}>
      <section className={styles.difficultySection}>
        {difficulties.map((difficulty) => {
          return <Card text={difficulty} action={handleDifficultySelect} />;
        })}
        <p>Game difficulty: {storeDifficulty}</p>
      </section>

      <section className={styles.categorySection}>
        {categoryList.map((category) => {
          return (
            <Card
              text={category.category}
              categoryID={category.fetchID}
              action={handleCategorySelect}
            />
          );
        })}
      </section>

      <p>Question category: {storeCategory}</p>

      <section className={styles.buttonSection}>
        <button>
          <Link to={"/game"}>PLAY</Link>
        </button>
      </section>
    </main>
  );
};

export default MenuPage;
