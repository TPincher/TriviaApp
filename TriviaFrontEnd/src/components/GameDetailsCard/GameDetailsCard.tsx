import styles from "./GameDetailsCard.module.scss";

interface Props {
  question: String;
  pAnswers: String[];
  answer: String;
  sAnswer: String;
  killerQ: String;
}

const GameDetailsCard = (props: Props) => {
  const checker = [styles.gameDetailsCard];

  if (props.killerQ == null) {
    checker.push(styles.gameDetailsCardCorrect);
  } else {
    checker.push(styles.gameDetailsCardIncorrect);
  }

  return (
    <section className={checker.join(" ")}>
      <p>Question: {props.question}</p>
      <p>Possible answers: {props.pAnswers}</p>
      {props.answer == props.sAnswer && <p>Answer: {props.answer}</p>}
    </section>
  );
};

export default GameDetailsCard;
