import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loaded, loading, userLogin } from '../../redux/actions';
import LoginImage from '../../img/login_image.jpg'

function Login() {
  const { userLoginStatus, redirect } = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    dispatch(loading());
    const res = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: pass })
    });
    const data = res.json();

    if (res.status === 400 || res.status === 500 || !data) {
      dispatch(loaded());
      alert('Invalid login credentials');
    } else {
      dispatch(userLogin());
      dispatch(loaded());
      alert('Login successful');
    }
  }

  useEffect(() => {
    if (userLoginStatus) {
      if (redirect) {
        navigate(redirect, { replace: true });
      } else {
        navigate('/user', { replace: true });
      }
    }
  })

  return (
    <section className="bg-dark" style={{ height: "100vh" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-block">
                  <img src={LoginImage} alt="login_image" className="img-fluid" id='img' />
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">User Login</h3>

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
                        required />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember Me
                      </label>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center pt-3">
                      <button type="submit" className="btn btn-warning btn-lg ms-2" onClick={handleLogin}>Login</button>
                    </div>
                    <div className='text-center mt-1'>
                      <Link to='/user/signup' className='text-decoration-none'>don't have an account</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
