import React, { useState, useEffect } from 'react';
import { useParams, Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navigation from './Navigation';
const DATA_URL = 'https://api.covid19india.org/state_district_wise.json';


export default function State() {
    const stateCode = useParams().stateCode;

    const [districtData, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getData = () => {
        fetch(DATA_URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data[stateCode]) {
                    setData(data[stateCode]);
                } else {
                    setData(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (districtData) {
        return (
            <React.Fragment>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <Navigation></Navigation>
                </div>
                <div className="data-table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Active</th>
                                <th>Confirmed</th>
                                <th>Deceased</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* { districtData['districtData'] ? console.log(districtData['districtData'], '53') : } */}
                            {
                                districtData['districtData'] ? Object.keys(districtData['districtData']).map(firstKey => {
                                    return (
                                        <tr key={firstKey}>
                                            <td>{firstKey}</td>
                                            <td>{districtData['districtData'][firstKey]['active']}</td>
                                            <td>{districtData['districtData'][firstKey]['confirmed']}</td>
                                            <td>{districtData['districtData'][firstKey]['deceased']}</td>
                                        </tr>
                                    )
                                }) : 'Invalid search'}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}