import React, {useEffect, useState} from 'react'
import axios from 'axios'

function App() {

    const [countries, setCountries] = useState([])
    const filterState = useState('')

    useEffect(() => {
        console.log('effect')
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            console.log('promise fulfilled', response.data)
            setCountries(response.data)
        })
    }, [])

    return (
        <>
            <p>find countries</p>
            <Filter filterState={filterState}/>
            <ShowCountries countries={countries} filterState={filterState}/>
        </>
    );
}

const Filter = (props) => {
    const onFilterChange = (event) => {
        props.filterState[1](event.target.value)
    }
    return <input value={props.filterState[0]} onChange={onFilterChange}/>;
}

const ShowCountry = (props) => {
    const country = props.country
    console.log(country)
    return (
        <>
            <h1>{country.name}</h1>
            <p>{country.capital}</p>
            <p>population {country.population}</p>
            <h1>languages</h1>
            <Languages languages={country.languages}/>
            <img src={country.flag} alt={"flag"}/>
        </>
    )
}

const Languages = (props) => {
    return (
        props.languages.map(language => {
            return (
                <li>{language.name}</li>
            )
        })
    )
}

const ShowCountries = (props) => {
    const countries = props.countries.filter(country => country.name.includes(props.filterState[0]))

    if (countries.length === 1) {
        return <ShowCountry country={countries[0]}/>
    } else if (countries.length === 0) {
        return (
            <p>No matches,specify another filter</p>
        )
    } else if (countries.length >= 10) {
        return (
            <p>Too many matches,specify another filter</p>
        )
    } else {
        return countries.map(country => {
            return (
                <p>{country.name}</p>
            )
        })
    }
}

export default App;
