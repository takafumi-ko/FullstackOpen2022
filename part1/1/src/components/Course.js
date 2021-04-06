import React from 'react'

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
export default Course;