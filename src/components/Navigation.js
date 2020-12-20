import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="home" to="/">Home</Link>
                </li>
            </ul>
        </div>

    )
}