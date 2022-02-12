import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "../LoginView/LoginView";
import QuizView from "../QuizView/QuizView";
import ScoreView from "../ScoreView/ScoreView";
import TableView from "../TableView/TableView";

const App = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route
            path="/"
            element={<LoginView user={user} setUser={setUser} />}
          />
          {user ? (
            <>
              <Route
                path="/quiz"
                element={
                  <QuizView
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                  />
                }
              />
              <Route
                path="/score"
                element={<ScoreView userAnswers={userAnswers} user={user} />}
              />
              <Route path="/table" element={<TableView />} />
            </>
          ) : (
            <>
              <Route
                path="/quiz"
                element={<h2>Najpierw podaj nazwę użytkownika</h2>}
              />
              <Route
                path="/score"
                element={<h2>Najpierw podaj nazwę użytkownika</h2>}
              />
              <Route
                path="/table"
                element={<h2>Najpierw podaj nazwę użytkownika</h2>}
              />
            </>
          )}
          <Route path="*" element={<h2>Zabłądziłeś: 404!</h2>} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
