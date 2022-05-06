import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Status() {
    const { event_id, user_id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const handleStatusUpdate = async () => {
        try {
            const res = await fetch(`/customer/event/${event_id}/${user_id}/status`);
            const data = await res.json();
            if (res.status !== 200) {
                throw new Error(data.error);
            }
            alert(data.message);
            navigate(`/customer/event/${event_id}`);
        } catch (e) {
            console.log(e.message);
            alert(e.message);
        }
    }
    useEffect(() => {
        console.log("useEffect status");
        const fetchEventUserDetails = async () => {
            const res = await fetch(`/customer/event/${event_id}/${user_id}/read`);
            const data = await res.json();
            if (res.status === 401) {
                navigate('/customer/login', { replace: true });
            }
            else if (res.status === 200) {
                setData(data);
            } else {
                console.log("error:", data.error);
            }
        }
        fetchEventUserDetails()
    }, [navigate, event_id, user_id])

    if (data) {
        return (
            <>
                <div className="container shadow bg-body rounded p-5 m-5 border">
                    <div className="row p-4 pb-2 border-bottom">
                        <div className="col-3">
                            <h3>Event Details :</h3>
                        </div>
                        <div className="col">
                            <h3><br /></h3>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Name:
                                </div>
                                <div className="col">
                                    {data.event.name} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Type:
                                </div>
                                <div className="col">
                                    {data.event.type} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Place:
                                </div>
                                <div className="col">
                                    {data.event.place} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Start Date:
                                </div>
                                <div className="col">
                                    {data.event.startDate} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    End Date:
                                </div>
                                <div className="col">
                                    {data.event.endDate} <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-4 pb-2 border-bottom">
                        <div className="col-3">
                            <h3>User Details :</h3>
                        </div>
                        <div className="col">
                            <h3><br /></h3>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    First Name:
                                </div>
                                <div className="col">
                                    {data.user.firstname} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Last Name:
                                </div>
                                <div className="col">
                                    {data.user.lastname} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Email:
                                </div>
                                <div className="col">
                                    {data.user.email} <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-2 font-bolder nav-color">
                                    Status:
                                </div>
                                <div className={`col ${data.status ? 'text-success' : 'text-danger'}`}>
                                    <strong>
                                        {data.status ? "Checked In" : "-"} <br />
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col">
                            <button className="btn btn-primary p-2 m-4 ms-0 text-center" onClick={handleStatusUpdate} disabled={data.status}>Update Status</button>
                        </div>
                    </div>
                </div>
                {/* <div className="row m-0 p-0 pt-5">
                    <h1>
                        Event Details:
                    </h1>
                    <div className='row'>
                        <div className="col-2 font-bolder nav-color">
                            Name:
                        </div>
                        <div className="col">
                            {data.event.name} <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            Type:
                        </div>
                        <div className="col">
                            {data.event.type} <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            Place:
                        </div>
                        <div className="col">
                            {data.event.place} <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            Start Date:
                        </div>
                        <div className="col">
                            {data.event.startDate} <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            End Date:
                        </div>
                        <div className="col">
                            {data.event.endDate} <br />
                        </div>
                    </div>
                </div>
                <div className="row m-0 p-0 pt-5">
                    <h1>
                        User Details:
                    </h1>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            First Name:
                        </div>
                        <div className="col">
                            {data.user.firstname} <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            Last Name:
                        </div>
                        <div className="col">
                            {data.user.lastname} <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            Email:
                        </div>
                        <div className="col">
                            {data.user.email} <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4 font-bolder nav-color">
                            Status:
                        </div>
                        <div className="col">
                            {data.status ? "Checked In" : "-"} <br />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleStatusUpdate} disabled={data.status}>Update Status</button> */}
            </>
        )
    } else {
        return (
            null
        )
    }
}

export default Status