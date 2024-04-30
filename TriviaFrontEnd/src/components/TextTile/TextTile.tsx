import styles from "./TextTile.module.scss";

interface Props {
  text: string;
  onclick?: Function;
  activeTile?: boolean;
}

const TextTile = (props: Props) => {
  const styleList = [styles.container];

  if (props.activeTile) {
    styleList.push(styles.active);
  }

  return (
    <div className={styleList.join(" ")}>
      <p className={styles.text}>{props.text}</p>
    </div>
  );
};

export default TextTile;
