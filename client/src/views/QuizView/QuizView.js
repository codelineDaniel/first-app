import React, { useState } from "react";
import styles from "./QuizView.module.scss";
import questions from "../../data/questions";
import Button from "../../components/Button/Button";

const QuizView = ({ userAnswers, setUserAnswers }) => {
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [notChecked, setNotChecked] = useState(true);
  // const [userAnswers, setUserAnswers] = useState([]);

  const addAnswer = () => {
    const allRadioInput = document.querySelectorAll('input[type="radio"]');
    for (const input of allRadioInput) {
      if (input.checked) {
        questions[currentQuestions].answers.forEach((answers) => {
          if (answers.answer === input.nextElementSibling.textContent) {
            setUserAnswers((prevState) => [...prevState, answers.correct]);
          }
        });
      }
    }
  };

  const deleteLastAnswer = () => {
    const answers = [...userAnswers];
    answers.pop();
    setUserAnswers(answers);
  };

  const nextQuestionClick = () => {
    addAnswer();
    if (currentQuestions < questions.length - 1) {
      setCurrentQuestions(currentQuestions + 1);
    }
    setNotChecked(true);
  };

  const previousQuestionClick = () => {
    deleteLastAnswer();
    setCurrentQuestions(currentQuestions - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.question_box}>
        <h4>
          Pytanie numer {currentQuestions + 1}/{questions.length}
        </h4>
        <h2>{questions[currentQuestions].question}</h2>
      </div>
      <div className={styles.answers_box}>
        {questions[currentQuestions].answers.map((item) => {
          return (
            <label key={item.answerNumber}>
              <input
                className={styles.answer_input}
                type="radio"
                name="answer"
                onClick={() => setNotChecked(false)}
              />
              <span className={styles.answer_span}>{item.answer}</span>
            </label>
          );
        })}
      </div>
      <div className={styles.button_box}>
        {currentQuestions > 0 && (
          <Button content={"poprzednie"} onClickFn={previousQuestionClick} />
        )}
        <>
          {currentQuestions === questions.length - 1 ? (
            <Button
              content={"następne"}
              onClickFn={nextQuestionClick}
              disabled={notChecked}
              linkTo={"/score"}
            />
          ) : (
            <Button
              content={"następne"}
              onClickFn={nextQuestionClick}
              disabled={notChecked}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default QuizView;
