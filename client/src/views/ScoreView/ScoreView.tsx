import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ScoreView.module.scss";
import Button from "../../components/Button/Button";

export interface ScoreViewProps {
  userAnswers: boolean[];
  setUserAnswers: React.Dispatch<React.SetStateAction<boolean[]>>;
  user: string;
}

const ScoreView: React.FC<ScoreViewProps> = ({ userAnswers,setUserAnswers , user }) => {
  const navigate = useNavigate();
  const correctAnswer = userAnswers.filter((item) => item === true);

  const clearUserAnswers = async (): Promise<void> => {
    await setUserAnswers([]);
  }

  const updateScoreAndOpenTable = async (): Promise<void> => {
    const response = await fetch("http://localhost:3001/user/updateUser", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        score: correctAnswer.length,
      }),
    });
    const data = await response.json();
    data && navigate("/table");
    await clearUserAnswers();
  };





  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h4>{user} Twój wynik to:</h4>
        <h2>{correctAnswer.length} poprawnych odpowiedzi</h2>
      </div>
      <Button content={"Tabela wyników"} onClickFn={updateScoreAndOpenTable} />
    </div>
  );
};

export default ScoreView;

// TODO: Dokończyć buttona, dodać mu funkcje update wyniku użytkownika, oraz nowy button który będzie otwierał tabele wyników, a z tabeli wyników, będzie już można tylko na strone główną i cacy. Potem wszystko na TS przepisać, ale używając już gita i pchając to z commitami na githuba.
