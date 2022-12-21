import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Outlet} from "react-router-dom";
import './App.css';
import {capitalize} from "@mui/material";

function App(props) {

    const [poke, getPokemons] = useState(null);

    useEffect(() => {
        axios({method: "get",
            url: "",})
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

        <section className="section" >
            <div className="App container">
                <Outlet />
                <div className="gridView">
                    {poke && poke.results.map(pokemon => (
                        <Link to={"/pokemon/"+pokemon.name}>{capitalize(pokemon.name)}</Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default App;
