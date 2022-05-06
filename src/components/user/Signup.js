import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImage from '../../img/signup_image.webp'
import { loaded, loading } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userLoginStatus} = useSelector(state => state.reducer);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const handleSignup = async () => {
    if (pass !== cpass) {
      alert('Passwords do not match')
    } else {
      try {
        dispatch(loading());
        const res = await fetch('/user/register', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstname: first,
            lastname: last,
            email: email,
            password: pass
          })
        });
        if (res.status === 422 || res.status === 404) {
          const {error} = await res.json();
          alert(error)
          dispatch(loaded())
          throw new Error(error)
        } else {
          const data = await res.json();
          dispatch(loaded());
          alert(data.firstname+", registration successful");
          navigate('/user/login');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  useEffect(() => {
    if (userLoginStatus) {
      navigate('/user',{ replace: true });
    }
  })

  return (
    <>
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-lg-6 d-none d-lg-block">
                    <img src={signupImage} alt="SignupImage" className="img-fluid" />
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">User Signup</h3>

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
                          id="password"
                          value={pass}
                          className="form-control form-control-lg"
                          placeholder="password"
                          onChange={(e) => setPass(e.target.value)}
                          required
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          id="cpassword"
                          value={cpass}
                          className="form-control form-control-lg"
                          placeholder="cpassword"
                          onChange={(e) => setCpass(e.target.value)}
                          required
                        />
                        <label htmlFor="cpassword">Confirm Password</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Agree all the terms and conditions
                        </label>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-center pt-3">
                        <button type="submit" className="btn btn-warning btn-lg ms-2" onClick={handleSignup}>Signup</button>
                      </div>
                      <div className="text-center mt-2">
                        <Link to='/user/login' className='text-decoration-none'>Have an account</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
