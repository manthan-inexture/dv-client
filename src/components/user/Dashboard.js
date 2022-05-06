import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loaded, loading } from '../../redux/actions';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userLoginStatus } = useSelector(state => state.reducer);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState();
    const fetchRegisteredEvents = async () => {
        try {
            const res = await fetch('/user/event/read');
            if (res.status === 401) {
                navigate('/user/login');
            } else {
                const data = await res.json();
                console.log(data);
                setRegisteredEvents(data.registeredEvents);
                setSelectedEvent();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeregister = async (id) => {
        dispatch(loading());
        const res = await fetch(`/user/event/${id}/deregister`, {
            method: 'POST'
        });
        if (res.status === 200) {
            const data = await res.json();
            dispatch(loaded());
            alert(data.status);
            fetchRegisteredEvents();
        }
    }
    useEffect(() => {
        fetchRegisteredEvents();
    }, [])

    if (userLoginStatus) {
        return (
            <>
                <div className="row m-0">
                    <div className="col-7 p-0 offset-1">
                        <p className="h1">Registered Events</p>
                        <div className="table-responsive-md">
                            <table className="table table-striped table-hover caption-top">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Event Name</th>
                                        <th scope="col">Event Place</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        registeredEvents.map((event, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{event.name}</td>
                                                    <td>{event.place}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <button className="btn btn-danger me-2" onClick={() => handleDeregister(event._id)} >Deregister</button>
                                                            <button className="btn btn-info me-2" onClick={() => setSelectedEvent(event)} >Details</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col p-0">
                        {
                            selectedEvent ?
                                <div className="hover-container">
                                    <div className="card hover-card shadow p-3 mb-5 bg-body">
                                        <div className="card-body event-detail">
                                            <div className='row mb-2'>
                                                <h2>Event Details</h2>
                                            </div>
                                            <div className='row'>
                                                <div className="col-4 font-bolder nav-color">
                                                    Name:
                                                </div>
                                                <div className="col">
                                                    {selectedEvent.name} <br />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-4 font-bolder nav-color">
                                                    Type:
                                                </div>
                                                <div className="col">
                                                    {selectedEvent.type} <br />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-4 font-bolder nav-color">
                                                    Place:
                                                </div>
                                                <div className="col">
                                                    {selectedEvent.place} <br />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-4 font-bolder nav-color">
                                                    Start Date:
                                                </div>
                                                <div className="col">
                                                    {selectedEvent.startDate} <br />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-4 font-bolder nav-color">
                                                    End Date:
                                                </div>
                                                <div className="col">
                                                    {selectedEvent.endDate} <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="hover-container">
                                    <div className="card hover-card shadow p-3 mb-5 bg-body">
                                        <div className="card-body">
                                            <h4 className="card-title initial-msg">
                                                Please Click On <br />
                                                the Event Details to see <br />
                                                Event's Full Information.
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </>
        )
    } else {
        return ''
    }
}

export default Dashboard