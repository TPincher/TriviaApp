import { useDispatch, useSelector } from "react-redux";
import styles from "./GamePage.module.scss";
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
  const [questionB, setQuestionB] = useState(-1);
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
      setResult("you got it right");
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
      setResult("you got it wrong");
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
    <main className={styles.container}>
      <section className={styles.topSection}>
        <div className={styles.topDiv}>
          {roundActive && roundQuestion && <p>{roundQuestion.question}</p>}
        </div>
        <div className={styles.topDiv}>
          <p>Score: {gameScore}</p>
        </div>
      </section>

      <section className={styles.middleSection}>
        {!gameOver && !roundActive && gameScore == 0 && (
          <button onClick={initialize}>First question!</button>
        )}
        {!gameOver && !roundActive && gameScore > 0 && (
          <button onClick={startRound}>Next question!</button>
        )}
        {roundActive &&
          roundQuestion.allAnswers != undefined &&
          roundQuestion.allAnswers.map((answer: any, key: number) => {
            answers.push(answer);
            return (
              <button key={key} onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            );
          })}
      </section>

      <section className={styles.bottomSection}>
        <p>Your Answer: {selectedAnswer}</p>
        <p>{result}</p>
        {!gameOver && roundActive && (
          <button onClick={answerCheck}>Submit</button>
        )}
        {gameOver && (
          <LinkButton link={"gameover"} buttonText={"GO TO SCORE SCREEN"} />
        )}
      </section>
    </main>
  );
};

export default GamePage;
