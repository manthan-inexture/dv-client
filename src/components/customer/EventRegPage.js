import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { loading, loaded } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import eventRegImage from '../../img/signup_image.webp';

function EventRegPage() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, "0") + '-' + today.getDate().toString().padStart(2, "0") + 'T' + today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0");
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [place, setPlace] = useState('');
    const [start, setStart] = useState(date);
    const [end, setEnd] = useState(date);
    const navigate = useNavigate();
    const clearState = () => {
        setName('')
        setType('')
        setPlace('')
        setStart('')
        setEnd('')
    }
    const handleSubmit = async () => {
        try {
            dispatch(loading());
            const res = await fetch('/customer/event/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    type: type,
                    place: place,
                    startDate: start,
                    endDate: end
                })
            });
            if (res.status === 400 || res.status === 404) {
                const { error } = await res.json();
                alert(error)
                dispatch(loaded())
                throw new Error(error)
            } else {
                const data = await res.json();
                dispatch(loaded());
                if (data) {
                    alert("Event Created");
                }
                navigate('/customer/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-lg-6 d-none d-lg-block">
                                    <img src={eventRegImage} alt="event Registration" className="img-fluid" />
                                </div>
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase">Event Registration form</h3>
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
                                        <hr />
                                        <div className="d-flex justify-content-between pt-3">
                                            <button type="reset" className="btn btn-danger btn-lg" onClick={() => clearState()}>Reset all</button>
                                            <button type="submit" className="btn btn-warning btn-lg ms-2" onClick={() => handleSubmit()}>Submit form</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventRegPage