import { updateKillerQ } from "../../services/userService";
import styles from "./AnswerTile.module.scss";

interface Props {
  answer: string;
  correctAnswer: string;
  killerQid: number;
}

const answerCheck = (props: Props) => {
  if (props.answer == props.correctAnswer) {
    console.log("you got it right this time");
    updateKillerQ(props.killerQid);
  } else {
    console.log("you're still a fuckup");
  }
};

const AnswerTile = (props: Props) => {
  return (
    <div>
      <p>{props.answer}</p>
      <button onClick={() => answerCheck(props)}>Check</button>
    </div>
  );
};

export default AnswerTile;
