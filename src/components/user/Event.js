import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addRedirectPath, removeRedirectPath } from '../../redux/actions';


function Event() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLoginStatus, redirect } = useSelector(state => state.reducer);
    const [event, setEvent] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const [registered, setRegistered] = useState();

    const fetchEventDetails = async () => {
        const res = await fetch(`/user/event/${id}/validate`);
        const data = await res.json();
        if (res.status === 401) {
            dispatch(addRedirectPath())
            navigate('/user/login', { replace: true });
        }
        else if (data) {
            setEvent(data.event);
            setRegistered(data.registered);
        }
        setIsLoaded(false);
    }
    const handleDeregister = async () => {
        setIsLoaded(true);
        const res = await fetch(`/user/event/${id}/deregister`, {
            method: 'POST'
        });
        if (res.status === 200) {
            const data = await res.json();
            setRegistered(false);
            setIsLoaded(false);
            alert(data.status);
        }
    }
    const handleRegister = async () => {
        setIsLoaded(true);
        const res = await fetch(`/user/event/${id}/register`, {
            method: 'POST'
        });
        if (res.status === 200) {
            const data = await res.json();
            setRegistered(true);
            setIsLoaded(false);
            alert(data.status);
        }
    }
    useEffect(() => {
        fetchEventDetails();
        if (redirect) {
            dispatch(removeRedirectPath());
        }
    }, []);

    if (isLoaded || !userLoginStatus) {
        return ''
    } else {
        return (
            <>
                <div className="container shadow bg-body rounded p-5 m-5 border">
                    <div class="row p-4 pb-2 border-bottom">
                        <div class="col-3">
                            <h3>Event Details :</h3>
                        </div>
                        <div class="col">
                            <h3><br /></h3>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Name:
                                </div>
                                <div className="col">
                                    {event.name} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Type:
                                </div>
                                <div className="col">
                                    {event.type} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Place:
                                </div>
                                <div className="col">
                                    {event.place} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Start Date:
                                </div>
                                <div className="col">
                                    {event.startDate} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    End Date:
                                </div>
                                <div className="col">
                                    {event.endDate} <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-3"></div>
                        <div className='col p-2 m-4'>
                            {
                                registered ?
                                    <button className="btn btn-danger" onClick={handleDeregister}>
                                        Deregister
                                    </button>
                                    :
                                    <button className="btn btn-primary" onClick={handleRegister}>
                                        Register
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Event;