import React, { useState, useEffect } from "react";
import styles from "./TableView.module.scss";
import Button from "../../components/Button/Button";
import questions from "../../data/questions";

const TableView = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3001/user");
      const data = await response.json();
      setAllUsers([...data]);
    };

    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.user_list}>
        {allUsers.map((user) => {
          return (
            <li key={user.id} className={styles.user_list_item}>
              <div>{user.user}</div>
              <div>
                {user.score} / {questions.length} pkt.
              </div>
            </li>
          );
        })}
      </ul>
      <Button linkTo={"/"} content={"wróć"} />
    </div>
  );
};

export default TableView;
