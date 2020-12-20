import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { browserHistory } from 'react-router';

import Navigation from './Navigation';
const DATA_URL = 'https://api.covid19india.org/state_district_wise.json';


export default function HomePageComponent() {
    const [stateData, setStateData] = useState([]);
    // const [districtData, setDistrictData] = useState([]);
    const history = useHistory();

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
                setSData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const setSData = (data) => {
        const sData = [];
        if (data && Object.keys(data).length > 0) {
            Object.keys(data).forEach(s => {
                if (s !== 'State Unassigned') {
                    if (data[s]['districtData']) {
                        const districtData = {
                            state: s,
                            active: 0,
                            deceased: 0,
                            confirmed: 0
                        };
                        Object.keys(data[s]['districtData']).forEach(dd => {
                            districtData.active = districtData.active + data[s]['districtData'][dd]['active'];
                            districtData.deceased = districtData.deceased + data[s]['districtData'][dd]['deceased'];
                            districtData.confirmed = districtData.confirmed + data[s]['districtData'][dd]['confirmed'];
                        })
                        sData.push(districtData);
                    }
                }
            });
        }
        setStateData(sData);
    }

    function rowClick(e) {
        if (e && e.target && e.target.innerHTML) {
            history.push(`/state/${e.target.innerHTML}`);
        } else {
            alert('There are some error, Please try later');
        }
      }

    if (stateData) {
        return (
            <React.Fragment>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <Navigation></Navigation>
                </div>

<div className="container">
    Note: App data may be differ due to API sync. API sync with actual data in every 5-6 hours.<br/>
    If you want to check your city status please click on the state link in the next page all the cities will be listed with that particular state
    </div>

                <div className="data-table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>State</th>
                                <th>Active</th>
                                <th>Confirmed</th>
                                <th>Deceased</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stateData.map(sd => {
                                    return (<tr key={sd.state}>
                                        <td><Link to={"/State/"+sd.state}>{sd.state}</Link></td>
                                        <td>{sd.active}</td>
                                        <td>{sd.confirmed}</td>
                                        <td>{sd.deceased}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    } else {
        <span>Error in API call</span>
    }
}