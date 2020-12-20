import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import State from './State';


export default function AppRoute() {

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState({});

    React.useEffect(() => {
        fetch("https://api.covid19india.org/data.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <React.Fragment>
            <div className="w-100">
                <BrowserRouter>
                    <div>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/about" component={About} exact />
                        <Route path="/state/:stateCode" component={State} exact />
                    </div>
                </BrowserRouter>
            </div>
        </React.Fragment>
    )
}