import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import {useLoaderData, useParams} from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {capitalize} from "@mui/material";

import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';


function PokeData() {


    const data = letterFrequency;

    const width = 500;
    const height = 500;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => d.letter;
    const y = d => +d.frequency * 100;

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(x),
        padding: 0.4,
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(y))],
    });

    const compose = (scale, accessor) => data => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);

    const [pokemon, getPokemonData] = useState(null);
    const { pokeid } = useParams();

    useEffect(() => {
        axios({method: "get",
            url: "https://pokeapi.co/api/v2/pokemon/"+pokeid,})
            .then((response) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(response)
                    }, 1)
                })
            })
            .then((response)=>{
                const data = response.data
                getPokemonData(data)
            }).catch((error) => {
            if(error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers)
            }
        })
    }, [])

    if(pokemon == null) {
        return "Loading";
    }

    return (
        <section className="section PokeData">
            <div className="container">
                <div className=" card">
                    <div className="card-content">
                        <div className="columns">
                            <div className="column is-one-quarter is-offset-3 content">
                                <p>ID: {pokemon.id}</p>
                                <p>Name: {capitalize(pokemon.name)}</p>
                                <p>Types: {getTypes(pokemon.types)}</p>
                                <p>Weight: {pokemon.weight}</p>
                                <p>Height: {pokemon.height}</p>
                            </div>
                            <div className="column is-one-quarter">
                                {getStatsTable(pokemon.stats)}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-one-third is-offset-4">
                                {/*<img src={pokemon.sprites.front_default} />*/}
                                {/*<img src={pokemon.sprites.back_default} />*/}
                                {/*<img src={pokemon.sprites.front_shiny} />*/}
                                {/*<img src={pokemon.sprites.back_shiny} />*/}
                                <svg width={width} height={height}>
                                    {data.map((d, i) => {
                                        const barHeight = yMax - yPoint(d);
                                        return (
                                            <Group key={`bar-${i}`}>
                                                <Bar
                                                    x={xPoint(d)}
                                                    y={yMax - barHeight}
                                                    height={barHeight}
                                                    width={xScale.bandwidth()}
                                                    fill="#fc2e1c"
                                                />
                                            </Group>
                                        );
                                    })}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function getTypes(types){
    let typeString = "";
    console.log(types);
    for (const type of types) {
        typeString = typeString +" "+ capitalize(type.type.name);
    }
    return typeString;
}

function getStatsTable(stats){
    return (<>
        <table className="table">
            <thead>
                <tr>
                    <th>Stat</th> <th>Base</th> <th>Effort</th>
                </tr>
            </thead>
            <tbody>
            <tr><td><p>{capitalize(stats[0].stat.name)}</p> </td> <td><p>{stats[0].base_stat}</p></td> <td><p>{stats[0].effort}</p></td></tr>
            <tr><td><p>{capitalize(stats[1].stat.name)}</p> </td> <td><p>{stats[1].base_stat}</p></td> <td><p>{stats[1].effort}</p></td></tr>
            <tr><td><p>{capitalize(stats[2].stat.name)}</p> </td> <td><p>{stats[2].base_stat}</p></td> <td><p>{stats[2].effort}</p></td></tr>
            <tr><td><p>{capitalize(stats[3].stat.name)}</p> </td> <td><p>{stats[3].base_stat}</p></td> <td><p>{stats[3].effort}</p></td></tr>
            <tr><td><p>{capitalize(stats[4].stat.name)}</p> </td> <td><p>{stats[4].base_stat}</p></td> <td><p>{stats[4].effort}</p></td></tr>
            <tr><td><p>{capitalize(stats[5].stat.name)}</p> </td> <td><p>{stats[5].base_stat}</p></td> <td><p>{stats[5].effort}</p></td></tr>
            </tbody>
        </table>
        <div className="column is-one-quarter">

        </div>
    </>)
}

export default PokeData;