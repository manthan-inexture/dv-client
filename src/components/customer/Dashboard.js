import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCustomerEvents, loaded, loading } from '../../redux/actions';
import Event from './Event';

function Dashboard() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, "0") + '-' + today.getDate().toString().padStart(2, "0") + 'T' + today.getHours() + ":" + today.getMinutes();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [place, setPlace] = useState('');
    const [activeEventId, setActiveEventId] = useState();
    const [start, setStart] = useState(date);
    const [end, setEnd] = useState(date);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const createdEvents = useSelector(state => state.reducer.createdEvents);

    const fetchCreatedEvents = async () => {
        try {
            dispatch(loading());
            const res = await fetch('/customer/event/read', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: "include"
            });

            if (res.status !== 200) {
                const { error } = await res.json();
                alert(error);
                dispatch(loaded());
                throw new Error(res.error);
            }
            const data = await res.json();
            dispatch(fetchCustomerEvents(data.createdEvents));
            dispatch(loaded());
        } catch (err) {
            console.log(err);
            dispatch(loaded());
            navigate('/customer/login', { replace: true });
        }
    }

    const updateActiveId = (id) => {
        setActiveEventId(id);
    }

    const fetchActiveEvent = () => {
        createdEvents.forEach((event, index) => {
            if (event._id === activeEventId) {
                setName(createdEvents[index].name);
                setType(createdEvents[index].type);
                setPlace(createdEvents[index].place);
                setStart(createdEvents[index].startDate);
                setEnd(createdEvents[index].endDate);
            }
        });
    }

    useEffect(() => {
        fetchCreatedEvents();
    }, []);
    useEffect(() => {
        if (activeEventId) {
            fetchActiveEvent();
        }
    }, [activeEventId]);

    const eventRegister = () => {
        navigate('/customer/event/register');
    }
    const handleUpdate = async () => {
        try {
            dispatch(loading());
            const res = await fetch(`/customer/event/${activeEventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, type: type, place: place, startDate: start, endDate: end })
            });
            if (res.status !== 200) {
                const { error } = await res.json();
                alert(error);
                throw new Error(error);
            }
            const data = await res.json();
            alert('Event updated');
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(loaded());
            fetchCreatedEvents();
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 ms-5 me-5">
                        <center><p className="h1 mt-4 mb-3" style={{color: "darkred"}}>Created Events</p></center>
                        <div className="table-responsive-md">
                            <table className="table table-striped table-hover caption-top">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Event Name</th>
                                        <th scope="col">Event Place</th>
                                        <th scope='col'>Start Time</th>
                                        <th scope="col">Actions</th>
                                        <th scope="col">Qr Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        createdEvents?.map((createdEvent, index) => {
                                            return (
                                                <Event key={createdEvent._id} event={createdEvent} index={index + 1} updateActiveId={updateActiveId} fetchCreatedEvents={fetchCreatedEvents} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mt-5 me-5">
                        <h3>For Event Registration Check out here:</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem et temporibus facere, molestias excepturi voluptate reiciendis esse sunt minus mollitia ab alias, maiores aut dolore sapiente perspiciatis debitis. Unde, explicabo.</p>
                        <button className="btn btn-primary" onClick={() => eventRegister()}>create event</button>
                    </div>
                </div>
            </div>
            {/* update modal */}
            <div className="modal fade" id="updateEvent" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Update Event </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    className="form-control form-control-lg"
                                    placeholder="Event Name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <label htmlFor="name">Event Name</label>
                            </div>

                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    id="type"
                                    value={type}
                                    className="form-control form-control-lg"
                                    placeholder="Event Type"
                                    onChange={(e) => setType(e.target.value)}
                                />
                                <label htmlFor="type">Event Type</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    id="place"
                                    value={place}
                                    className="form-control form-control-lg"
                                    placeholder="Event Place"
                                    onChange={(e) => setPlace(e.target.value)}
                                />
                                <label htmlFor="place">Event Place</label>
                            </div>

                            <div className="form-floating mb-4">
                                <input
                                    type="datetime-local"
                                    id="start_date"
                                    value={start}
                                    className="form-control form-control-lg"
                                    placeholder="Event start Date-time"
                                    onChange={(e) => setStart(e.target.value)}
                                />
                                <label htmlFor="event_start_date">Event start Date and Time</label>
                            </div>

                            <div className="form-floating mb-4">
                                <input
                                    type="datetime-local"
                                    id="end_date"
                                    value={end}
                                    className="form-control form-control-lg"
                                    placeholder="Event end Date-time"
                                    onChange={(e) => setEnd(e.target.value)}
                                />
                                <label htmlFor="event_end_date" className="form-label">Event End Date and Time</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleUpdate()}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard