import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

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
        <StatisticLine text="hyvä" value={good} />
        <StatisticLine text="neutraali" value={neutral} />
        <StatisticLine text="huono" value={bad} />
        <StatisticLine text="yhteensä" value={total} />
        <StatisticLine text="keskiarvo" value={average.toFixed(2)} />
        <StatisticLine text="positiivisia" value={positive.toFixed(1) + ' %'} />
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
      <Button onClick={() => setGood(good + 1)} text="hyvä" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutraali" />
      <Button onClick={() => setBad(bad + 1)} text="huono" />

      <h2>statistiikka</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
