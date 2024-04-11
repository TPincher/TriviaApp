import Card from "../components/Card/Card";
import styles from "./HomePage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { useEffect, useState } from "react";
import { fetchQuestion } from "../data";

interface Props {
  categoryList: any;
}

const HomePage = (props: Props) => {
  const difficulties: string[] = ["easy", "medium", "hard", "all"];
  const [selectedDifficulty, setSelectedDifficulty] = useState("none selected");
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedDifficulty, selectedCategory]);

  console.log(props.categoryList);

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
        {props.categoryList.map((category) => {
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

export default HomePage;
