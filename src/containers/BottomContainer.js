import React from 'react';
import { Link } from 'react-router-dom';
import './BottomContainer.css';

function BottomContainer() {
    return (
        <div className="bottom-navbar">
            <div className="bottom-nav row">
                <div className="col-6 mt-4">
                    <Link to='/user' className="navbar__item"><i className="fa-solid fa-arrow-left"></i> User</Link>
                </div>
                <div className="col-6 mt-4">
                    <Link to='/customer' className="navbar__item">Customer <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    )
}

export default BottomContainer