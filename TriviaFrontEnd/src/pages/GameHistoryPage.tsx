import { useEffect, useState } from "react";
import styles from "./GameHistoryPage.module.scss";
import { getUser } from "../services/userService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton/LinkButton";

const GameHistoryPage = () => {
  const triviaState = useSelector((state) => state.trivia);
  const storeUser = triviaState.player.id;
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    getUser(storeUser).then((data: any) => setActiveUser(data));
  }, []);

  return (
    <div>
      <LinkButton link={""} buttonText={"BACK"} />
      <section className={styles.statsSection}>
        <h3>Game History</h3>
        <div>
          {activeUser.name != undefined &&
            activeUser.gameHistory.map((game: any, key: number) => {
              return (
                <div>
                  <p>ID: {game.id}</p>
                  <p>Difficulty: {game.difficulty}</p>
                  <p>Questions: {game.questionsBlockId.length}</p>
                  <p>Score: {game.score}</p>

                  <LinkButton
                    link={`gameDetails/${game.id}`}
                    buttonText={"GAME DETAILS"}
                  />
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default GameHistoryPage;
