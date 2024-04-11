import styles from "./Card.module.scss";

interface Props {
  text: string;
  data?: unknown;
  categoryID?: string;
  action: React.Dispatch<React.SetStateAction<any>>;
}

const Card = (props: Props) => {
  const setAction = () => {
    props.action(props.text);
  };

  return (
    <div className={styles.boxContainer} onClick={setAction}>
      <div className={styles.box}>{props.text}</div>
    </div>
  );
};

export default Card;
