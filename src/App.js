import React, { useEffect, useState } from "react";
import "./App.css";

const PATTERN_TO_CHARACTER_MAP = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

const App = () => {
  const [keydownTimestamp, setKeydownTimestamp] = useState(null);
  const [keyupTimestamp, setKeyupTimestamp] = useState(null);
  const [pattern, setPattern] = useState(""); // example: ...
  const [sentence, setSentence] = useState(""); // example: SOS
  const [lastTimeout, setLastTimeout] = useState(null);
  const helper = Object.entries(PATTERN_TO_CHARACTER_MAP);

  console.log(helper);

  const resetApp = () => {
    setSentence("");
  };
  useEffect(() => {
    if (keydownTimestamp && keyupTimestamp) {
      setKeydownTimestamp(null);
      setKeyupTimestamp(null);

      const duration = (keyupTimestamp - keydownTimestamp) / 1000;

      const updatedPattern = pattern + (duration < 0.5 ? "." : "-");

      setPattern(updatedPattern);

      const newTimeout = setTimeout(() => {
        if (updatedPattern && PATTERN_TO_CHARACTER_MAP[updatedPattern]) {
          setSentence(sentence + PATTERN_TO_CHARACTER_MAP[updatedPattern]); // Add a character to sentance
        }

        setPattern("");
      }, 2000);

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      setLastTimeout(newTimeout);
    }
  }, [keydownTimestamp, keyupTimestamp]);

  useEffect(() => {
    console.log("Pattern: " + pattern);
  }, [pattern]);

  useEffect(() => {
    console.log("Sentence: " + sentence);
  }, [sentence]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 32 && !event.repeat) {
        setKeydownTimestamp(new Date().getTime());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.keyCode === 32 && !event.repeat) {
        setKeyupTimestamp(new Date().getTime());
      }
    };

    document.addEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <div className="App">
      <h4>{!sentence ? "Press SpaceBar" : sentence}</h4>
      <h6>{pattern}</h6>
      <div className="rules">
        <span>Hold spacebar fo less than 0.5s to type .</span>
        <br />
        <span>Hold spacebar fo over than 0.5s to type -</span>
        <br />
        <span>Release spacebar for over 2s to comfirm character</span>
      </div>
      <button onClick={resetApp}>reset</button>

      <div className="letter_container">
        {helper.map((object) => (
          <span key={object} className="letter">
            {object[0]} : {object[1]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
