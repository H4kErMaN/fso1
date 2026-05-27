import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return <p>ei yhtään palautetta annettu</p>
  }

  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <tr><td>hyvä</td><td>{good}</td></tr>
        <tr><td>neutraali</td><td>{neutral}</td></tr>
        <tr><td>huono</td><td>{bad}</td></tr>
        <tr><td>yhteensä</td><td>{total}</td></tr>
        <tr><td>keskiarvo</td><td>{average.toFixed(2)}</td></tr>
        <tr><td>positiivisia</td><td>{positive.toFixed(1)} %</td></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <button onClick={() => setGood(good + 1)}>hyvä</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutraali</button>
      <button onClick={() => setBad(bad + 1)}>huono</button>

      <h2>statistiikka</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
