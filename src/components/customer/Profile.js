import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loaded, loading, cusLogout, cusData } from '../../redux/actions';

import '../../styles/Profile.css';

function Profile() {
  const customerData = useSelector(state => state.reducer.cusData);
  const dispatch = useDispatch();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newCpass, setNewCpass] = useState('');
  const navigate = useNavigate();
  const callProfilePage = async () => {
    try {
      dispatch(loading());
      const res = await fetch('/customer/profile', {
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
        throw new Error(res.error);
      }
      const data = await res.json();
      dispatch(cusData(data));
      setFirst(data.firstname || '');
      setLast(data.lastname || '');
      setEmail(data.email || '');
      dispatch(loaded());
    } catch (err) {
      console.log(err);
      dispatch(loaded());
      navigate('/customer/login', { replace: true });
    }
  }

  useEffect(() => {
    callProfilePage();
  }, [])

  const logoutAll = () => {
    fetch('/customer/logoutAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((res) => {
      alert('Logged Out from all devices');
      dispatch(cusLogout());
      navigate('/', { replace: true });
      if (res.status !== 200) {
        throw new Error(res.error);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleUpdate = async () => {
    try {
      dispatch(loading());
      if (newPass !== newCpass) {
        alert('Confirm Passwords do not match');
        throw new Error('Passwords do not match');
      }
      const res = await fetch('/customer/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname: first, lastname: last, email: email, oldPassword: oldPass, newPassword: newPass })
      });
      if (res.status !== 200) {
        const { error } = await res.json();
        dispatch(loaded())
        if (error.split(' ')[0] === 'E11000') {
          alert('Could not update email. Please try again with different email')
        } else {
          alert(error);
        }
        throw new Error(error);
      }
      const data = await res.json();
      alert('User updated')
      dispatch(cusData(data));
      setFirst(data.firstname);
      setLast(data.lastname);
      setEmail(data.email);
      setOldPass('');
      setNewPass('');
      setNewCpass('');
      dispatch(loaded());
    } catch (err) {
      console.log(err);
      setOldPass('');
      setNewPass('');
      setNewCpass('');
      dispatch(loaded());
    }
  }
  if (customerData) {
    return (
      <>
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container p-0 d-flex justify-content-center">
              <div className="col-xl-8 col-sm-12">
                <div className="card user-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 user-profile bg-dark">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile" />
                        </div>
                        <h5 className="f-w-600 m-b-20">{`${customerData.firstname} ${customerData.lastname}`}</h5>
                        <i className="fa-solid fa-pen-to-square fs-3" data-bs-toggle="modal" data-bs-target="#updateProfile"></i>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        <h1 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h1>

                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">First Name</p>
                            <h6 className="text-muted f-w-400">{customerData.firstname}</h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Last Name</p>
                            <h6 className="text-muted f-w-400">{customerData.lastname}</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">{customerData.email}</h6>
                          </div>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={logoutAll}>LogoutAll</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="updateProfile" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="title" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="title">Update Profile</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="first"
                          value={first}
                          className="form-control form-control-lg"
                          placeholder="First name"
                          onChange={(e) => setFirst(e.target.value)}
                          required
                        />
                        <label htmlFor="first">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="last"
                          value={last}
                          className="form-control form-control-lg"
                          placeholder="Last name"
                          onChange={(e) => setLast(e.target.value)}
                          required
                        />
                        <label htmlFor="last">Last Name</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      className="form-control form-control-lg"
                      placeholder="Email ID"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Email ID</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      id="oldpassword"
                      value={oldPass}
                      className="form-control form-control-lg"
                      placeholder="Old Password"
                      onChange={(e) => setOldPass(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Old Password</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      id="password"
                      value={newPass}
                      className="form-control form-control-lg"
                      placeholder="New Password"
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                    <label htmlFor="password">New Password</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      id="cpassword"
                      value={newCpass}
                      className="form-control form-control-lg"
                      placeholder="Confirm New Password"
                      onChange={(e) => setNewCpass(e.target.value)}
                      required
                    />
                    <label htmlFor="cpassword">Confirm New Password</label>
                  </div>
                  <p className="text-danger">Note : Leave Blank if dont want to change the password<br />You have to add old password to change any of the data fields</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleUpdate()}>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return ''
  }
}

export default Profile