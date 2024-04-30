import { addUser, getAllUsers } from "../services/userService";
import pageStyles from "./AllPages.module.scss";
import styles from "./LandingPage.module.scss";
import { useEffect, useState } from "react";
import { setPlayer } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import LinkButton from "../components/LinkButton/LinkButton";
import TextTile from "../components/TextTile/TextTile";
import Banner from "../components/Banner/Banner";

const LandingPage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const storeUsers = triviaState.player;
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  const createUserClick = async () => {
    await addUser(input);
    setUsers(await getAllUsers());
  };

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const loadUsers = async () => {
      setUsers(await getAllUsers());
    };
    loadUsers();
  }, []);

  const handlePlayerSelect = (name: string, id: number) => {
    dispatch(setPlayer({ name, id }));
  };

  return (
    <main className={pageStyles.allPages}>
      <section className={styles.container}>
        <div className={styles.LPTitle}>
          <Banner text={"Create New Player"} />
          <input
            type={"text"}
            value={input}
            onChange={handleInputChange}
          ></input>
          <button onClick={createUserClick}>Register</button>
          <Banner text={"Current Players"} />
        </div>

        <div className={styles.LPUsers}>
          {users.map((user: any, _key: number) => {
            let active = false;
            if (storeUsers.name == user.name) {
              active = true;
            }
            return (
              <div onClick={() => handlePlayerSelect(user.name, user.id)}>
                <TextTile text={user.name} activeTile={active} />
              </div>
            );
          })}
        </div>
        <div className={styles.LPButtons}>
          {/* <button>Delete user</button> */}
          {storeUsers.name && (
            <LinkButton link={"menu"} buttonText={"NEW GAME"} />
          )}
          {storeUsers.name && (
            <LinkButton link={"gameHistory"} buttonText={"PLAYER HISTORY"} />
          )}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
