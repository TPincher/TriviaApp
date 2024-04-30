import { useEffect, useState } from "react";
import styles from "./GameHistoryPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { getUser } from "../services/userService";
import { useSelector } from "react-redux";
import LinkButton from "../components/LinkButton/LinkButton";

const GameHistoryPage = () => {
  const triviaState = useSelector((state) => state.trivia);
  const storeUser = triviaState.player.id;
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    getUser(storeUser).then((data: any) => setActiveUser(data));
  }, []);

  return (
    <main className={pageStyles.allPages}>
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
    </main>
  );
};

export default GameHistoryPage;
