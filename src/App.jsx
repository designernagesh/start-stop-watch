import { useState, useEffect, useRef } from "react";

function App() {
  const [timer, setTimer] = useState("00 : 00 : 00 : 000");
  const intervalIdRef = useRef(null);

  const startTimer = () => {
    if (!intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          let [hours, minutes, seconds, milliseconds] = prevTimer.split(" : ").map(Number);
          milliseconds += 10;

          if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;

            if (seconds === 60) {
              seconds = 0;
              minutes++;

              if (minutes === 60) {
                minutes = 0;
                hours++;
              }
            }
          }

          const h = hours < 10 ? `0${hours}` : hours;
          const m = minutes < 10 ? `0${minutes}` : minutes;
          const s = seconds < 10 ? `0${seconds}` : seconds;
          const ms =
            milliseconds < 10
              ? `00${milliseconds}`
              : milliseconds < 100
              ? `0${milliseconds}`
              : milliseconds;

          return `${h} : ${m} : ${s} : ${ms}`;
        });
      }, 10);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    setTimer("00 : 00 : 00 : 000");
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="title">Start Stop and Pause Watch</h2>
        <p className="sub-title">Click the buttons and check the Timer! 😊</p>

        <div className="emoji">⏱️</div>
        <div className="timerDisplay">{timer}</div>
        <div className="buttons">
          <button onClick={resetTimer}>Reset</button>
          <button onClick={pauseTimer}>Pause</button>
          <button onClick={startTimer}>Start</button>
        </div>
      </div>
    </>
  );
}

export default App;
