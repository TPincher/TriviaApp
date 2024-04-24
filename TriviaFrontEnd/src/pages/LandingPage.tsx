import { Link } from "react-router-dom";
import { addUser, getAllUsers } from "../services/userService";
import styles from "./LandingPage.module.scss";
import { useState } from "react";
import { setPlayer } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
  const dispatch = useDispatch();
  const triviaState = useSelector((state) => state.trivia);
  const storeUsers = triviaState.player;
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  const createUserClick = () => {
    addUser(input);
  };

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const usersButtonClick = async () => {
    setUsers(await getAllUsers());
    console.log(users);
    console.log("working");
  };

  const handlePlayerSelect = (value: any) => {
    dispatch(setPlayer(value));
    console.log(storeUsers);
  };

  return (
    <main>
      <button onClick={usersButtonClick}>Click for users</button>
      <div className={styles.container}>
        <section className={styles.left}>
          <h1>Create new user</h1>
          <input
            type={"text"}
            value={input}
            onChange={handleInputChange}
          ></input>
          <button onClick={createUserClick}>Create</button>
        </section>
        <section className={styles.right}>
          {users.map((user: any, id: number) => {
            return (
              <p onClick={() => handlePlayerSelect(user.name)}>{user.name}</p>
            );
          })}
          <button>Delete user</button>
        </section>
      </div>
      <p>{`Current user: ${storeUsers}`}</p>
      {storeUsers && (
        <button>
          <Link to={"/menu"}>PLAY</Link>
        </button>
      )}
    </main>
  );
};

export default LandingPage;
