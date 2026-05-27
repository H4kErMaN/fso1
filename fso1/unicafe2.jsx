import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>anna palautetta</h1>
      <button onClick={() => setGood(good + 1)}>hyvä</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutraali</button>
      <button onClick={() => setBad(bad + 1)}>huono</button>

      <h2>statistiikka</h2>
      <p>hyvä {good}</p>
      <p>neutraali {neutral}</p>
      <p>huono {bad}</p>
      <p>yhteensä {total}</p>
      <p>keskiarvo {average.toFixed(2)}</p>
      <p>positiivisia {positive.toFixed(1)} %</p>
    </div>
  )
}

export default App
