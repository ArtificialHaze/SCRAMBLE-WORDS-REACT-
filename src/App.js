import "./App.css";
import React, { useEffect, useState } from "react";

const WORDS = [
  "Typescript",
  "Javascript",
  "Next",
  "PHP",
  "Developer",
  "Freelancer",
  "React",
  "Redux",
  "CSS",
  "Python",
];

const App = () => {
  const [value, setValue] = useState("");
  const [isPlaying, setisPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");

  useEffect(() => {
    let clearMessage;
    if (message === "Wrong" || message === "Correct") {
      clearMessage = setTimeout(() => {
        setMessage("");
      }, 2500);
    }
    return () => {
      if (clearMessage) {
        clearTimeout(clearMessage);
      }
    };
  }, [message]);

  const makeScrambleWord = (word) => {
    const shuffledWords = word.split("");
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const randomW = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[randomW]] = [
        shuffledWords[randomW],
        shuffledWords[i],
      ];
    }
    return shuffledWords.join("");
  };

  const handleEnterClick = () => {
    if (value !== "") {
      if (correct.toLowerCase() === value.toLowerCase()) {
        setMessage("Correct");
      } else {
        setMessage("Wrong");
      }
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const selectAWord = () => {
    const randomWordIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomWordIndex];
  };

  const handleStart = () => {
    setisPlaying(true);
    setValue("");
    setMessage("");

    const word = selectAWord();
    setCorrect(word);
    setScrambledWord(makeScrambleWord(word));
  };

  return (
    <div className="word_scramble">
      {!!message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
      <h1>Word scramble</h1>
      <div className="content">
        {isPlaying ? (
          <>
            <div className="board">
              {correct.split("").map((element, i) => {
                <span key={`${element}-${i}`} className="square_bg">
                  {value[i]}
                </span>;
              })}
            </div>
            <p className="scrambled_word">{scrambledWord}</p>
            <div className="field">
              <input
                type="text"
                className="input"
                value={value}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="enter_btn btn"
                onClick={handleEnterClick}
              >
                Enter
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="btn start_game_btn"
            onClick={handleStart}
          >
            Start
          </button>
        )}
        {isPlaying && (
          <button
            type="button"
            className="btn new_game_btn"
            onClick={handleStart}
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
