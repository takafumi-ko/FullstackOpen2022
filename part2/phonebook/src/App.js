import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const AddPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', newName)

        if(persons.filter(person=>person.name === newName).length){
            window.alert(`${newName} is already added to phonebook`);
            setNewName('')
            return
        }

        const newPerson = {
            name: newName
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    const handlePersonChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }

    const ShowPersons = (props) => {
        return props.persons.map(person =>
            <Person key={person.name} person={person}/>
        )
    }

    const Person = (props) => {
        return (
            <p>
                {props.person.name}
            </p>
        )
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={AddPerson}>
                <div>
                    name: <input value={newName}
                                 onChange={handlePersonChange}
                />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>

            <ShowPersons persons={persons}/>

            <div>debug: {newName}</div>
        </div>
    )
}

export default App