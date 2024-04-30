import styles from "./LinkButton.module.scss";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  buttonText: string;
}

const LinkButton = (props: Props) => {
  return (
    <div className={styles.button}>
      <Link className={styles.link} to={`/${props.link}`}>
        {props.buttonText}
      </Link>
    </div>
  );
};

export default LinkButton;
