import { addUser, getAllUsers } from "../services/userService";
import mainStyles from "./AllPages.module.scss";
import styles from "./LandingPage.module.scss";
import { useEffect, useState } from "react";
import { setPlayer } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import LinkButton from "../components/LinkButton/LinkButton";

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
    <main className={mainStyles.allPages}>
      <section className={styles.container}>
        <div>
          <h1>Create new user</h1>
          <input
            type={"text"}
            value={input}
            onChange={handleInputChange}
          ></input>
          <button onClick={createUserClick}>Create</button>
        </div>

        <div>
          {users.map((user: any, key: number) => {
            return (
              <p
                onClick={() => handlePlayerSelect(user.name, user.id)}
                key={key}
              >
                {user.name}
              </p>
            );
          })}
          <button>Delete user</button>
          {storeUsers.name && <LinkButton link={"menu"} buttonText={"PLAY"} />}
          {storeUsers.name && (
            <LinkButton link={"gameHistory"} buttonText={"PLAYER HISTORY"} />
          )}
          <p>{`Current user: ${storeUsers.name} id: ${storeUsers.id}`}</p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
