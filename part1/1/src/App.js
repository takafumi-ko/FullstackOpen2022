function App() {
    const course = 'Half Stack application development'

    const messages = [
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
            <Content messages={messages}/>
            <Total messages={messages}/>
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

// コンポーネントで蚊変数のコンポーネントを返す方法は？
const Content = (props) => {
    const messages = props.messages

    return (
        <>
            <Part message={messages[0]}/>
            <Part message={messages[1]}/>
            <Part message={messages[2]}/>
        </>
    )

}

const Total = (props) => {
    const messages = props.messages
    return (
        <p>Number of exercises {messages[0].exercises + messages[1].exercises + messages[2].exercises}</p>
    )
}

export default App;
