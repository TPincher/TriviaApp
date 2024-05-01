import { useDispatch, useSelector } from "react-redux";
import styles from "./GamePage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { fetchQuestion } from "../services/triviaAPI";
import { useEffect, useState } from "react";
import {
  submitGameHistory,
  submitQuestionBlock,
  submitScoreToGameHistory,
  submitkillerQ,
} from "../services/userService";
import { changeScore } from "../redux/actions";
import LinkButton from "../components/LinkButton/LinkButton";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";

const GamePage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const storeUsers = triviaState.player;
  const storeDifficulty = triviaState.difficulty;
  const storeCategory = triviaState.category;
  const [roundActive, setRoundActive] = useState(false);
  const [roundQuestion, setRoundQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState("");
  const [gameScore, setGameScore] = useState(0);
  const [gameHistoryID, setGameHistoryID] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [_questionB, setQuestionB] = useState(-1);
  let answers: string[] = [];

  const startRound = async () => {
    setRoundActive(!roundActive);
    await questionFetcher();
    setResult("");
    setSelectedAnswer("");
    console.log(roundQuestion);
  };

  const initialize = () => {
    submitGameHistory({
      userId: storeUsers.id,
      difficulty: storeDifficulty,
      score: 0,
    })
      .then((returnID: any) => setGameHistoryID(returnID.id))
      .then(startRound);
  };

  const questionFetcher = async () => {
    let stringToSend = `&category=${storeCategory.id}`;
    if (
      storeDifficulty == "easy" ||
      storeDifficulty == "medium" ||
      storeDifficulty == "hard"
    ) {
      stringToSend += `&difficulty=${storeDifficulty}`;
    }
    console.log(stringToSend);
    fetchQuestion(stringToSend).then((data: any) => setRoundQuestion(data));
  };

  const answerCheck = async () => {
    if (selectedAnswer == roundQuestion.answer) {
      console.log(gameHistoryID);
      setResult("CORRECT!");
      setSelectedAnswer("");
      setRoundActive(!roundActive);
      setGameScore(gameScore + 1);
      await submitQuestionBlock({
        gameHistory: gameHistoryID,
        questionText: roundQuestion.question,
        answers: answers.join(" --- "),
        submittedAnswer: selectedAnswer,
        correctAnswer: roundQuestion.answer,
      });
      console.log(answers);
      startRound;
    } else {
      setResult("THAT'S INCORRECT!");
      setSelectedAnswer("");
      dispatch(changeScore(gameScore));
      setRoundActive(!roundActive);
      setGameOver(true);

      // Wait for both functions to complete before proceeding
      await Promise.all([
        submitQuestionBlock({
          gameHistory: gameHistoryID,
          questionText: roundQuestion.question,
          answers: answers.join(" --- "),
          submittedAnswer: selectedAnswer,
          correctAnswer: roundQuestion.answer,
        }),
        submitScoreToGameHistory(gameHistoryID, gameScore),
      ]).then(([questionBlockData]) => {
        setQuestionB(questionBlockData.id);
        return submitkillerQ({
          category: storeCategory.name,
          corrected: false,
          user: storeUsers.id,
          questionBlock: questionBlockData.id,
        });
      });
    }
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  useEffect(() => {}, [result]);

  return (
    <main className={pageStyles.allPages}>
      <section className={styles.topSection}>
        <Banner text={`Score: ${gameScore}`} />
        {roundActive && roundQuestion && <p>{roundQuestion.question}</p>}
      </section>

      <section className={styles.middleSection}>
        {!gameOver && !roundActive && gameScore == 0 && (
          <button className={styles.answerCard} onClick={initialize}>
            First question!
          </button>
        )}
        {!gameOver && !roundActive && gameScore > 0 && (
          <button className={styles.answerCard} onClick={startRound}>
            Next question!
          </button>
        )}
        {roundActive &&
          roundQuestion.allAnswers != undefined &&
          roundQuestion.allAnswers.map((answer: any, key: number) => {
            answers.push(answer);
            let active = false;
            if (selectedAnswer == answer) {
              active = true;
            }
            return (
              <Card
                key={key}
                text={answer}
                activeTile={active}
                action={() => handleSelectAnswer(answer)}
              />
            );
          })}
        {gameOver && (
          <LinkButton link={"gameover"} buttonText={"GO TO SCORE SCREEN"} />
        )}
      </section>

      <section className={styles.bottomSection}>
        <p>{result}</p>
        {!gameOver && roundActive && selectedAnswer && (
          <button className={styles.submitButton} onClick={answerCheck}>
            Final Answer?
          </button>
        )}
      </section>
    </main>
  );
};

export default GamePage;
