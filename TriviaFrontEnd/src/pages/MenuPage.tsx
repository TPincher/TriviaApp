import Card from "../components/Card/Card";
import styles from "./MenuPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { useEffect, useState } from "react";
import { fetchCategories } from "../services/triviaAPI";
import { updateCategory, updateDifficulty } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/userService";
import LinkButton from "../components/LinkButton/LinkButton";
import Banner from "../components/Banner/Banner";

const MenuPage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const player = triviaState.player;
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
  const storeUser = triviaState.player.id;
  const difficulties: string[] = ["easy", "medium", "hard", "all"];
  const [categoryList, setCategoryList] = useState([]);
  const [_activeUser, setActiveUser] = useState({});

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
      <Banner text={player.name} />
      <section className={styles.selectors}>
        <div className={styles.difficultySection}>
          {difficulties.map((difficulty: any, key: number) => {
            let active = false;
            if (storeDifficulty == difficulty) {
              active = true;
            }
            return (
              <Card
                key={key}
                text={difficulty}
                activeTile={active}
                action={handleDifficultySelect}
              />
            );
          })}
        </div>

        <div className={styles.categorySection}>
          {categoryList.map((category: any, key: number) => {
            let active = false;
            if (storeCategory.name == category.category) {
              active = true;
            }
            return (
              <Card
                key={key}
                text={category.category}
                categoryID={category.fetchID}
                activeTile={active}
                action={handleCategorySelect}
              />
            );
          })}
        </div>
      </section>

      <section className={styles.MPButtons}>
        {storeDifficulty != "" && (
          <LinkButton link={"game"} buttonText={"PLAY"} />
        )}
        <LinkButton link={""} buttonText={"BACK"} />
      </section>
    </main>
  );
};

export default MenuPage;
