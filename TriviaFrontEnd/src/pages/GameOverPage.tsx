import { useDispatch, useSelector } from "react-redux";
import styles from "./GameOverPage.module.scss";
import LinkButton from "../components/LinkButton/LinkButton";

const GameOverPage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const storePlayer = triviaState.player;
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
  const storeScore = triviaState.score;

  return (
    <main>
      <section className={styles.gameOver}>
        <p>{storePlayer.name}</p>
        <p>{storeDifficulty}</p>
        <p>{storeCategory.name}</p>
        <p>{storeScore}</p>
        <LinkButton link={"menu"} buttonText={"PLAY AGAIN?"} />
      </section>
    </main>
  );
};

export default GameOverPage;
