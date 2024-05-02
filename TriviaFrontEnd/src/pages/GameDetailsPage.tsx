import { useParams } from "react-router-dom";
import pageStyles from "./AllPages.module.scss";
import styles from "./GameDetailsPage.module.scss";
import { getGameHistory } from "../services/userService";
import { useEffect, useState } from "react";
import GameDetailsCard from "../components/GameDetailsCard/GameDetailsCard";
import AnswerTile from "../components/AnswerTile/AnswerTile";
import LinkButton from "../components/LinkButton/LinkButton";
import Banner from "../components/Banner/Banner";

const GameDetailsPage = () => {
  const pathVariables = useParams();
  const id = pathVariables.id;
  const APIid = parseInt(id);
  const [gameDetails, setGameDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    getGameHistory(APIid)
      .then((data) => {
        setGameDetails(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const finalQuestion =
    !loading &&
    gameDetails.questionsBlockId[gameDetails.questionsBlockId.length - 1];

  const splitAnswers = !loading && finalQuestion.answers.split(" --- ");

  const handleClick = () => {
    setRetry(!retry);
  };

  return (
    <main className={pageStyles.allPages}>
      <Banner text={`Game ${id}`} />
      <div className={styles.GDPContainer}>
        <section className={styles.GameDetailsPage}>
          {loading && <p>...Loading...</p>}
          {!loading &&
            gameDetails.questionsBlockId.map((questionBlock) => {
              return (
                <GameDetailsCard
                  question={questionBlock.questionText}
                  answer={questionBlock.correctAnswer}
                  sAnswer={questionBlock.submittedAnswer}
                  killerQ={questionBlock.killerQ}
                />
              );
            })}
        </section>
        <section className={styles.retrySection}>
          <button onClick={() => handleClick()}>Retry final question?</button>
          {!loading &&
            retry &&
            splitAnswers.map((answer) => {
              return (
                <AnswerTile
                  answer={answer}
                  correctAnswer={finalQuestion.correctAnswer}
                  killerQid={finalQuestion.killerQ}
                />
              );
            })}
        </section>
      </div>
      <section className={styles.GDButtons}>
        <LinkButton link={"gameHistory"} buttonText={"BACK"} />
      </section>
    </main>
  );
};

export default GameDetailsPage;
