import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Outlet} from "react-router-dom";
import './App.css';



function App() {

    const [poke, getPokemons] = useState(null);

    useEffect(() => {
        axios({method: "get",
            url: "https://pokeapi.co/api/v2/pokemon?limit=1154",})
            .then((response)=>{
                const data = response.data
                getPokemons(data)
            }).catch((error) => {
                if(error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers)
                }
        })
    }, [])


    return (
        <section className="App section" >
            <div className="container">
                <Outlet />
                <div className="gridView">
                    {poke && poke.results.map(pokemon => (
                        <p><Link to={"/pokemon/"+pokemon.name}>{capitalized(pokemon.name)}</Link></p>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default App;
