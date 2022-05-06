import React from 'react'
import { Link } from 'react-router-dom';

function User({ event_id, userData, index, fetchRegisteredUsers }) {
    const handleStatusUpdate = async () => {
        try {
            const res = await fetch(`/customer/event/${event_id}/${userData.user._id}/status`);
            const data = await res.json();
            if (res.status !== 200) {
                throw new Error(data.error);
            }
            alert(data.message);
            fetchRegisteredUsers();
        } catch (e) {
            console.log(e.message);
            alert(e.message);
        }
    }
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{userData.user.firstname + " " + userData.user.lastname}</td>
            <td>{userData.user.email}</td>
            <td>{userData.status ? 'Checked In' : 'Not Checked In'}</td>
            <td>
                <div className="d-flex">
                    <button className="btn btn-warning me-2" disabled={userData.status} onClick={handleStatusUpdate}>Update Status</button>
                    <Link to={`/customer/event/${event_id}/${userData.user._id}`} target='_blank' className="btn btn-primary"><i className="fa-solid fa-up-right-from-square"></i></Link>
                </div>
            </td>
        </tr>
    )
}

export default User