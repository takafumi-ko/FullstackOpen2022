import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [useFilter, setUseFilter] = useState(false)
    const [filter, setFilter] = useState('')

    const AddPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', newName, ' ', newNumber)

        if (persons.filter(person => person.name === newName).length) {
            window.alert(`${newName} is already added to phonebook`);
            setNewName('')
            setNewNumber('')
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        if (event.target.value) {
            setUseFilter(true)
            setFilter(event.target.value)
        } else {
            setUseFilter(false)
        }
    }

    const ShowPersons = (props) => {
        const persons = !useFilter ? props.persons : props.persons.filter(person => person.name.includes(filter))
        return persons.map(person => <Person key={person.name} person={person}/>)
    }

    const Person = (props) => {
        return (
            <p>
                {props.person.name} {props.person.number}
            </p>
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with<input onChange={handleFilter}/>
            <h2>Ass a new</h2>
            <form onSubmit={AddPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>

            <ShowPersons persons={persons}/>
        </div>
    )
}

export default App