
function App() {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]


    return courses.map(course=><Course course={course}/>)
}
const Course = (props) =>{
    return(
        <>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts}/>
        </>
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
            {props.message.name} {props.message.exercises}
        </p>
    )
}

const Content = (props) => {
    return props.parts.map(part =>
        <Part message={part}/>
    )
}

const Total = (props) => {
    const parts = props.parts

    const sum = parts.reduce((acc, part) => acc + Number(part.exercises), 0)

    return (
        <b>Total of exercises {sum}</b>
    )
}

export default App;
