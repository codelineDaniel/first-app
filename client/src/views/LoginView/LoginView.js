import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import styles from "./LoginView.module.scss";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

const LoginView = ({ user, setUser }) => {
  // const [login, setLogin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const sendDataToBackend = async () => {
    const response = await fetch("http://localhost:3001/user/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        score: 0,
      }),
    });
    const data = await response.json();

    if (response.status === 409) {
      setIsModalOpen(true);
    } else {
      data.message
        ? NotificationManager.error(data.message)
        : navigate("/quiz");
    }
  };

  // <>{(response.status = 409 && setIsModalOpen(true))}</>;
  // <>
  //   {data.message
  //     ? NotificationManager.error(data.message)
  //     : navigate("/quiz")}
  // </>;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <NotificationContainer />
        <h1 className={styles.title}>WIELKI TEST JAVASCRIPTU</h1>
        <label htmlFor="loginInput" className={styles.info}>
          wpisz swój login
          <br />
          aby porównać swój
          <br />
          wynik z innymi
          <br />
          <input
            autoComplete="off"
            id="loginInput"
            name="loginInput"
            value={user}
            placeholder="login..."
            className={styles.loginInput}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <Button
          // linkTo={"/quiz"}
          content={"dalej"}
          onClickFn={sendDataToBackend}
        />
      </div>
      {isModalOpen && <Modal closeModalFn={closeModal} />}
    </>
  );
};

export default LoginView;
