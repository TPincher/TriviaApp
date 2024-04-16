import { Link } from "react-router-dom";
import { getAllUsers } from "../services/userService";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const usersButtonClick = async () => {
    await getAllUsers();
  };

  return (
    <main>
      <button onClick={usersButtonClick}>Click for users</button>
      <div className={styles.container}>
        <section className={styles.left}></section>
        <section className={styles.right}>
          {/* List of all users pulled from backend */}
        </section>
      </div>
      <button>
        <Link to={"/menu"}>PLAY</Link>
      </button>
    </main>
  );
};

export default LandingPage;
