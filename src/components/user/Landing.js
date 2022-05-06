import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Landing() {
  const { userLoginStatus } = useSelector(state => state.reducer);

  return (
    <div className="back-image">
      <div className="container" style={{ paddingTop: '150px' }}>
        <div className="row align-items-center">
          <div className="col-12">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 text-white">
                <h1>Register Events Easily</h1>
                <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa nulla sed quis rerum amet natus quas necessitatibus.</p>
                {userLoginStatus ? <Link to="/user/dashboard" className="btn btn-primary">Go to Dashboard</Link> : <Link to="/user/login" className="btn btn-primary py-3 px-5 btn-pill">Login Now</Link>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing