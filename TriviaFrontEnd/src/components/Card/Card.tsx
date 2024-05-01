import styles from "./Card.module.scss";

interface Props {
  text: string;
  categoryID?: string;
  activeTile?: boolean;
  action?: React.Dispatch<React.SetStateAction<any>>;
}

const Card = (props: Props) => {
  const styleList = [styles.box];

  if (props.activeTile) {
    styleList.push(styles.active);
  }

  const setAction = () => {
    props.action != undefined && props.action(props.text, props.categoryID);
  };

  return (
    <div className={styles.boxContainer} onClick={setAction}>
      <div className={styleList.join(" ")}>{props.text}</div>
    </div>
  );
};

export default Card;
