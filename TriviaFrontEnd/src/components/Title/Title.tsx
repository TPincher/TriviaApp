import styles from "./Title.module.scss";

interface Props {
  text: string;
}

const Title = (props: Props) => {
  return <h1 className={styles.title}> - - - - {props.text} - - - - </h1>;
};

export default Title;
