import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import useDarkMode from 'use-dark-mode';


export default function About() {
    // constructor() {
    //     super();
    // }
    const darkMode = useDarkMode(false);
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="abc" to="/">Home</Link>
                </li>
                {/* <li className="nav-item active">
                    <Link className="abc" to="/About">About</Link>
                </li> */}
                {/* <Link className="abc" to="/signup">Register</Link>
                <Link className="abc" to="/starwars">Starwars</Link>
                <Link className="abc" to="/params/10/test">Url Parameters</Link> */}
            </ul>
        </div>

    )
}