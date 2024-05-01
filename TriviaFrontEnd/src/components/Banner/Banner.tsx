import styles from "./Banner.module.scss";

interface Props {
  text: string | number;
}

const Title = (props: Props) => {
  return <h1 className={styles.title}>{props.text}</h1>;
};

export default Title;
