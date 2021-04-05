function App() {
    const course = 'Half Stack application development'

    const parts = [
        {
            part: 'Fundamentals of React',
            exercises: 10
        },
        {
            part: 'Using props to pass data',
            exercises: 7
        },
        {
            part: 'State of a component',
            exercises: 14
        }
    ]
    return (
        <div>
            <Header course={course}/>
            <Content messages={parts}/>
            <Total messages={parts}/>
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {

    return (
        <p>
            {props.message.part} {props.message.exercises}
        </p>
    )
}

const Content = (props) => {
    return props.messages.map(message =>
        <Part message={message}/>
    )
}

const Total = (props) => {
    const messages = props.messages
    return (
        <p>Number of exercises {messages[0].exercises + messages[1].exercises + messages[2].exercises}</p>
    )
}

export default App;
