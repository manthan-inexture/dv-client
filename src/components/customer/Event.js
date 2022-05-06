import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loaded, loading } from '../../redux/actions';
import QRCode from "react-qr-code";
function Event({ event, index, updateActiveId, fetchCreatedEvents }) {
    const dispatch = useDispatch();
    const [startDate,startTime] = event.startDate.split('T');
    const [endDate,endTime] = event.endDate.split('T');
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin + "/user/event/" + event._id);
        alert("Link Copied");
    }   
    const qr = window.location.origin + "/user/event/" + event._id;
    const handleUpdateModal = () => {
        updateActiveId(event._id);
    }
    const handleDelete = async () => {
        try {
            dispatch(loading());
            const res = await fetch(`/customer/event/${event._id}`, {
                method: 'DELETE'
            });
            if (res.status !== 200) {
                const { error } = await res.json();
                alert(error);
                throw new Error(error);
            }
            const data = await res.json();
            if (data) {
                alert('Event Deleted');
            }
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(loaded());
            fetchCreatedEvents();
        }
    }
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{event.name}</td>
            <td>{event.place}</td>
            <td>{startDate + " " +startTime}</td>
            <td>
                <div className="d-flex">
                    <button className="btn btn-primary me-2" onClick={copyToClipboard}>Copy Link</button>
                    <button className="btn btn-warning me-2" data-bs-toggle='modal' data-bs-target='#updateEvent' onClick={handleUpdateModal}>Update</button>
                    <button className="btn btn-danger me-2" onClick={() => handleDelete()}>Delete</button>
                    <Link to={`/customer/event/${event._id}`} target='_blank' className="btn btn-primary"><i className="fa-solid fa-up-right-from-square"></i></Link>
                </div>
            </td>
            <td><QRCode value= { window.location.origin + "/user/event/" + event._id} /></td>
        </tr>
    )
}

export default Event