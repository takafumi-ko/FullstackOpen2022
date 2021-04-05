import React, {useState} from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)




    return (
        <>
            <Header text={'give feedback'}/>
            <Button handleClick={() => setGood(good + 1)} text="good"/>
            <Button handleClick={() => setNeutral(neutral + 1)} text="neural"/>
            <Button handleClick={() => setBad(bad + 1)} text="bad"/>
            <Header text={'statistics'}/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </>
    )
}

const Header = (props) => {
    return <h1>{props.text}</h1>
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistics = (props) => {
    let good = props.good
    let neutral = props.neutral
    let bad = props.bad
    let numOfFeedback = good + neutral + bad

    if(numOfFeedback===0)return <p>No feedback given</p>
    return(
        <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {good+bad}</p>
            <p>average {(good - bad) / numOfFeedback}</p>
            <p>positive {good / numOfFeedback} %</p>
        </>
    )

}
export default App