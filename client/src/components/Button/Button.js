import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const Button = ({ linkTo, content, onClickFn, disabled }) => (
  <button className={styles.nextBtn} onClick={onClickFn} disabled={disabled}>
    {linkTo ? <Link to={linkTo}>{content}</Link> : content}
  </button>
);

export default Button;
