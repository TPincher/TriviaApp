import Card from "../components/Card/Card";
import styles from "./MenuPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { useEffect, useState } from "react";
import { fetchCategories } from "../services/triviaAPI";
import { updateCategory, updateDifficulty } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../services/userService";
import LinkButton from "../components/LinkButton/LinkButton";

const MenuPage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const player = triviaState.player;
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
  const storeUser = triviaState.player.id;
  const difficulties: string[] = ["easy", "medium", "hard", "all"];
  const [categoryList, setCategoryList] = useState([]);
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    fetchCategories().then((data: any) => setCategoryList(data));
    getUser(storeUser).then((data: any) => setActiveUser(data));
  }, []);

  const handleDifficultySelect = (difficulty: String) => {
    dispatch(updateDifficulty(difficulty));
    console.log(storeDifficulty);
  };

  const handleCategorySelect = (category: String, categoryID: Number) => {
    dispatch(updateCategory({ name: category, id: categoryID }));
    console.log(storeCategory);
  };

  return (
    <main className={pageStyles.allPages}>
      <h1 className={styles.title}>Current Player: {player.name}</h1>
      <section className={styles.selectors}>
        <div className={styles.difficultySection}>
          {difficulties.map((difficulty: any, key: number) => {
            return (
              <Card
                key={key}
                text={difficulty}
                action={handleDifficultySelect}
              />
            );
          })}
          <p>Game difficulty: {storeDifficulty}</p>
        </div>

        <div className={styles.categorySection}>
          {categoryList.map((category: any, key: number) => {
            return (
              <Card
                key={key}
                text={category.category}
                categoryID={category.fetchID}
                action={handleCategorySelect}
              />
            );
          })}
        </div>
      </section>

      <p>Question category: {storeCategory.name}</p>

      <section className={styles.buttonSection}>
        {storeDifficulty != "" && (
          <LinkButton link={"game"} buttonText={"PLAY"} />
        )}
        <LinkButton link={""} buttonText={"BACK"} />
      </section>
    </main>
  );
};

export default MenuPage;
