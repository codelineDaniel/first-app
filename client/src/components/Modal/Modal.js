import React from "react";
import { Link } from "react-router-dom";
import styles from "./Modal.module.scss";

const Modal = (closeModalFn) => (
  <div className={styles.wrapper}>
    <p>
      Podana nazwa użytkownika jest już zajęta, jeśli to Ty jej użyłeś, możesz
      to zrobić ponownie, a Twój wynik zostanie nadpisany. Jeśli jednak nie
      należy ona do Ciebie, to bądź kreatywny i wymyśl se swoją leniu. Wierze w
      Waszą uczciowość :D.
    </p>
    <p>Czy dalej chcesz używać tej nazwy użytkownika ?</p>
    <div className={styles.button_box}>
      <Link to={"/quiz"}>Tak</Link>
      <Link to={"/"} onClick={closeModalFn}>
        Nie
      </Link>
    </div>
  </div>
);

export default Modal;
