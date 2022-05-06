import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { cusLogout } from '../../redux/actions';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/customer/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error(res.error);
            }
            alert('Logged Out Successfully');
            dispatch(cusLogout());
            navigate('/customer', { replace: true });
        }).catch((err) => {
            console.log(err);
        });
    });

    return <Navigate to="/customer" replace />;
}

export default Logout