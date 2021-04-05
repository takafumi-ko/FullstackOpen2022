import React, {useState} from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const calculateAll = (g,b)=>g-b
    const calculateAverage = (g,n,b)=>{
        let numOfFeedback = g+n+b
        return (g-b)/numOfFeedback
    }
    const calcPositive =(g,n,b)=>{
        let numOfFeedback = g+n+b
        return g/numOfFeedback
    }

    return (
        <>
            <Header text={'give feedback'}/>
            <Button handleClick={() => setGood(good+1)} text="good" />
            <Button handleClick={() => setNeutral(neutral+1)} text="neural" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <Header text={'statistics'}/>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {calculateAll(good,bad)}</p>
            <p>average {calculateAverage(good,neutral,bad)}</p>
            <p>positive {calcPositive(good,neutral,bad)} %</p>
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
export default App