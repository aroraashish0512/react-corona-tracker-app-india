import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
const DATA_URL = 'https://api.covid19india.org/website_data.json';

export default function About() {

    const [qa, setQa] = useState([]);

    useEffect(() => {
        getQa();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getQa = () => {
        fetch(DATA_URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setQa(data.faq);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <React.Fragment>
            <div className="navbar navbar-expand-lg navbar-light bg-light">
            <Navigation></Navigation>
            </div>
            <div className="container">
            Note :- There will be difference in the actual data and available data in this site because data is displaying from third party API
            </div>
        </React.Fragment>
    );
}