import { useEffect, useState } from "react";

const defaultStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: ".5rem"
}

function Home() {
  const [isAnswer, setAnswer] = useState(false)
  const [isYou, setYou] = useState(false)

  useEffect(() => {
    setYou(false)
    setAnswer(false)
  }, [])

  const handleDinner = () => {
    const time = new Date().getTime()
    setYou(time % 2 === 0)
    setAnswer(true)
  }

  return (
    <div style={{...defaultStyle, width: "100vw"}}>
      <h1>Who will make the dinner today?</h1>

      <button onClick={handleDinner}>Who?!?!?!</button>
      {isAnswer && <div style={defaultStyle}>
        {isYou ? (
        <>
          <h2>Ok it's my turn!!!</h2>
          <img src="https://media.giphy.com/media/Pjr0NCGk4WMQPQtg0C/giphy.gif" />
          
        </>
        )
        : (
        <>
          <h2>It is your turn! I will a play video game!!!!</h2>
          <img src="https://media.giphy.com/media/wPVThWJ0EX9oA/giphy.gif" />
        </>
        )}
      </div>}
    </div>

  )
}

export default Home;