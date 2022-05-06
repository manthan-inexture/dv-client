import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loaded, loading } from '../../redux/actions';
import User from './User';

function RegisteredUsers() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [event, setEvent] = useState();
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const fetchRegisteredUsers = async () => {
        try {
            dispatch(loading());
            const res = await fetch(`/customer/event/${id}/read`, {
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
            const { _id, name, type, place, startDate, endDate } = data;
            setEvent({ id: _id, name, type, place, startDate, endDate });
            setRegisteredUsers(data.registeredUsers);
            dispatch(loaded());
        } catch (err) {
            console.log(err);
            dispatch(loaded());
            navigate('/customer/login', { replace: true });
        }
    }
    useEffect(() => {
        fetchRegisteredUsers();
    }, []);
    return (
        <div className="container-fluid  ">
            <div className="row">
                <div className="col-8 ms-5 me-5">
                    <center><p className="h1 mt-4 mb-3" style={{ color: "darkred" }}>Registered Users</p></center>
                    <div className="table-responsive-md">
                        <table className="table table-striped table-hover caption-top">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope='col'>Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    registeredUsers?.map((registeredUser, index) => {
                                        return (
                                            <User key={registeredUser._id} event_id={event.id} userData={registeredUser} index={index + 1} fetchRegisteredUsers={fetchRegisteredUsers} />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    event ?
                        <div className="card hover-card shadow p-3 mb-5 bg-body">
                            <div className='col'>
                                <div className="card-body event-detail">
                                    <div className='row mb-2'>
                                        <h2>Event Details</h2>
                                    </div>
                                    <div className='row'>
                                        <div className="col-4 font-bolder nav-color">
                                            Name:
                                        </div>
                                        <div className="col">
                                            {event.name} <br />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-4 font-bolder nav-color">
                                            Type:
                                        </div>
                                        <div className="col">
                                            {event.type} <br />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-4 font-bolder nav-color">
                                            Place:
                                        </div>
                                        <div className="col">
                                            {event.place} <br />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-4 font-bolder nav-color">
                                            Start Date:
                                        </div>
                                        <div className="col">
                                            {event.startDate} <br />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-4 font-bolder nav-color">
                                            End Date:
                                        </div>
                                        <div className="col">
                                            {event.endDate} <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                }
            </div>
        </div>
    )
}

export default RegisteredUsers