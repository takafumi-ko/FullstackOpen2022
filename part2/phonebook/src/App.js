import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
    const personsState = useState([])

    const newNameState = useState('')
    const newNumberState = useState('')

    const filterState = useState('')
    const useFilterState = useState(false)

    useEffect(() => {
        console.log('effect')
        axios.get('http://localhost:3001/persons').then(response => {
            console.log('promise fulfilled',response.data)
            personsState[1](response.data)
        })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter useFilterState={useFilterState} filterState={filterState}/>
            <h2>Ass a new</h2>
            <PersonForm newNameState={newNameState} newNumberState={newNumberState} personState={personsState}/>
            <h2>Numbers</h2>
            <ShowPersons personsState={personsState} useFilterSate={useFilterState} filterState={filterState}/>
        </div>
    )
}
const Filter = (props) => {
    const handleFilter = (event) => {
        if (event.target.value) {
            props.useFilterState[1](true)
            props.filterState[1](event.target.value)
        } else {
            props.useFilterState[1](false)
            props.filterState[1]('')
        }
    }

    return (
        <>
            filter shown with<input
            value={props.filterState[0]}
            onChange={handleFilter}
        />
        </>
    )
}

const PersonForm =(props)=> {
    const AddPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', props.newNameState[0], ' ', props.newNumberState[0])

        if (props.personState[0].filter(person => person.name === props.newNameState[0]).length) {
            window.alert(`${props.newNameState[0]} is already added to phonebook`);
            props.newNameState[1]('')
            props.newNumberState[1]('')
            return
        }

        const newPerson = {
            name: props.newNameState[0],
            number: props.newNumberState[1]
        }
        props.personState[1](props.personState[0].concat(newPerson))
        props.newNameState[1]('')
        props.newNumberState[1]('')
    }

    const handleNameChange = (event) => {
        props.newNameState[1](event.target.value)
    }
    const handleNumberChange = (event) => {
        props.newNumberState[1](event.target.value)
    }

    return <form onSubmit={AddPerson}>
        <div>
            name: <input value={props.newNameState[0]} onChange={handleNameChange}/>
        </div>
        <div>
            number: <input value={props.newNumberState[0]} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>;
}

const ShowPersons = (props) => {
    const persons = !props.useFilterSate[0] ? props.personsState[0] : props.personsState[0].filter(person => person.name.includes(props.filterState[0]))
    return persons.map(person => <Person key={person.name} person={person}/>)
}

const Person = (props) => {
    return (
        <p>
            {props.person.name} {props.person.number}
        </p>
    )
}

export default App