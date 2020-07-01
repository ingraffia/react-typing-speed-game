import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() { 
  const GAMETIME = 5;
  const [text, setText] = useState('')
  const [timeLeft, setTimeLeft] = useState(GAMETIME)
  const [timeStart, setTimeStart] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const inputRef = useRef(null)

  // set the value of the textarea to useState hook.
  const handleChange = (event) => {
    const value = event.target.value;
    // set the value from the textarea to the useState hook for text.
    setText(value)
  }

  // count the number of words in the textarea.
  const calculateWordCount = (text) => {
    const numberCount = text.trim().split(" ");
    // do this to remove any counting when box is empty
    return numberCount.filter(word => word !== '').length
  }

  // set a function so you can click the button to begin a new game.
  const startGame = () => {
    setTimeStart(true)
    setTimeLeft(GAMETIME)
    setText('')
    // need to re-enable the textbox before you can set focus on it.
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  // once the game has ended, run these hooks.
  const endGame = () => {
    // set time to stop.
    setTimeStart(false)
    // calculate the number of words when the timer runs out.
    setWordCount(calculateWordCount(text))
  }

  useEffect(() => {
    setTimeout(() => {
      if(timeLeft > 0 && timeStart) {
        setTimeLeft(time => time - 1)
      } else if (timeLeft === 0) {
        endGame()
      }
    }, 1000)
    // set [timeLeft] because you only want to run this when timeLeft changes.
  }, [timeLeft, timeStart])

  
  return (
    <div className="App">
      <h1>Speed Typing</h1>
      <textarea ref={inputRef} disabled={!timeStart} onChange={handleChange} value={text} />
      <h2>Time Left: {timeLeft}</h2>
      <h2>Word Count: {wordCount}</h2>
      <button disabled={timeStart} onClick={startGame}>Start</button>
    </div>
  );
}

export default App;
