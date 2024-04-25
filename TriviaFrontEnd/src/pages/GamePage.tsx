import { useDispatch, useSelector } from "react-redux";
import styles from "./GamePage.module.scss";
import { fetchQuestion } from "../services/triviaAPI";
import { useState } from "react";

const GamePage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const storeUsers = triviaState.player;
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
  const [roundActive, setRoundActive] = useState(false);
  const [roundQuestion, setRoundQuestion] = useState({});

  const startRound = async () => {
    setRoundActive(!roundActive);
    await questionFetcher();
    console.log(roundQuestion);
  };

  const questionFetcher = async () => {
    fetchQuestion(
      `&category=${storeCategory.id}&difficulty=${storeDifficulty}`
    ).then((data: any) => setRoundQuestion(data));
  };

  const thing = () => {
    console.log(roundQuestion);
  };

  return (
    <main className={styles.container}>
      <section className={styles.topSection}>
        {roundActive && roundQuestion && <p>{roundQuestion.question}</p>}
      </section>

      <section className={styles.middleSection}>
        {!roundActive && <button onClick={startRound}>Next question!</button>}
        {roundActive &&
          roundQuestion &&
          roundQuestion.allAnswers.map((answer) => {
            return <p>{answer}</p>;
          })}
      </section>

      <section className={styles.bottomSection}>
        <button onClick={thing}>click me</button>
      </section>
    </main>
  );
};

export default GamePage;
