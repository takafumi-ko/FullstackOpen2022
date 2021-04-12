import React, {useEffect, useState} from 'react'
import phonebookService from "./components/phonebookService";

const App = () => {
    const personsState = useState([])

    const newNameState = useState('')
    const newNumberState = useState('')

    const filterState = useState('')
    const useFilterState = useState(false)

    useEffect(() => {
        phonebookService.getAll().then(data => personsState[1](data))
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter useFilterState={useFilterState} filterState={filterState}/>
            <h2>Ass a new</h2>
            <PersonForm newNameState={newNameState} newNumberState={newNumberState} personsState={personsState}/>
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

const PersonForm = (props) => {
    const AddPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', props.newNameState[0], ' ', props.newNumberState[0])

        if (!props.newNameState[0]) {
            window.alert(`The name input field is empty`);
            return
        }
        if (!props.newNumberState[0]) {
            window.alert(`The number input field is empty`);
            return
        }

        const matchedPerson = props.personsState[0].filter(person => person.name === props.newNameState[0])
        if (matchedPerson.length === 1) {
            const person = matchedPerson[0]

            const message = `${person.name} is already added to phonebook,replace the old number with a new one?`
            if (window.confirm(message)) {
                const newPerson = {...person, number: props.newNumberState[0]}

                phonebookService.update(person.id, newPerson).then(data => {
                    props.personsState[1](props.personsState[0].map(p =>
                        p.id !== person.id ? p : data)
                    )
                })
                props.newNameState[1]('')
                props.newNumberState[1]('')
            }
            return
        }

        const newPerson = {
            name: props.newNameState[0],
            number: props.newNumberState[0]
        }

        phonebookService.create(newPerson).then(data => {
            props.personsState[1](props.personsState[0].concat(data))
            props.newNameState[1]('')
            props.newNumberState[1]('')
        }).catch(error => console.log('fail', error))

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
    const OnDeleteClick = (id) => {
        phonebookService.deletePerson(id).then(data => props.personsState[1](data))
    };
    const persons = !props.useFilterSate[0] ? props.personsState[0] : props.personsState[0].filter(person => person.name.includes(props.filterState[0]))
    return persons.map(person => <Person key={person.name} person={person} OnDeleteClick={OnDeleteClick}/>)
}

const Person = (props) => {
    const message = `Delete ${props.person.name}?`
    const OnClick = () => {
        if (window.confirm(message)) {
            props.OnDeleteClick(props.person.id)
        }
    }
    return (
        <p>
            {props.person.name} {props.person.number}
            <button onClick={OnClick}>delete</button>
        </p>
    )
}

export default App