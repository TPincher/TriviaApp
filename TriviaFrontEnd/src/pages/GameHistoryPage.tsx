import { useEffect, useState } from "react";
import styles from "./GameHistoryPage.module.scss";
import pageStyles from "./AllPages.module.scss";
import { getUser } from "../services/userService";
import { useSelector } from "react-redux";
import LinkButton from "../components/LinkButton/LinkButton";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import { Game, User } from "../types/Types";

const GameHistoryPage = () => {
  const triviaState = useSelector((state: any) => state.trivia);
  const storeUser = triviaState.player.id;
  const [activeUser, setActiveUser] = useState<User>({
    name: "",
    gameHistory: [],
  });

  useEffect(() => {
    getUser(storeUser).then((data: User) => setActiveUser(data));
  }, []);

  return (
    <main className={pageStyles.allPages}>
      <Banner text={"Game History"} />

      <section className={styles.statsSection}>
        {activeUser.name != undefined &&
          activeUser.gameHistory.map((game: Game, _key: number) => {
            return (
              <div className={styles.GHBlock}>
                <div className={styles.GHBlock__stats}>
                  <Card text={`Difficulty: ${game.difficulty}`} />
                  <Card text={`Questions: ${game.questionsBlockId.length}`} />
                  <Card text={`Score: ${game.score}`} />
                </div>
                <div className={styles.GHButtons}>
                  <LinkButton
                    link={`gameDetails/${game.id}`}
                    buttonText={"GAME DETAILS"}
                  />
                </div>
              </div>
            );
          })}
      </section>
      <section className={styles.GHButtons}>
        <LinkButton link={""} buttonText={"BACK"} />
      </section>
    </main>
  );
};

export default GameHistoryPage;
