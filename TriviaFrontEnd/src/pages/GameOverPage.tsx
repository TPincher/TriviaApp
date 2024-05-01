import { useSelector } from "react-redux";
import styles from "./GameOverPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import LinkButton from "../components/LinkButton/LinkButton";
import Banner from "../components/Banner/Banner";

const GameOverPage = () => {
  const triviaState = useSelector((state) => state.trivia);
  const storePlayer = triviaState.player;
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
  const storeScore = triviaState.score;

  return (
    <main className={pageStyles.allPages}>
      <Banner text={`GAME OVER`} />
      <section className={styles.gameOver}>
        <h2>Player: {storePlayer.name}</h2>
        <h2>Difficulty: {storeDifficulty}</h2>
        <h2>Category: {storeCategory.name}</h2>
        <h2>Score: {storeScore}</h2>
      </section>

      <section className={styles.bottomSection}>
        <LinkButton link={"menu"} buttonText={"PLAY AGAIN?"} />
      </section>
    </main>
  );
};

export default GameOverPage;
