import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/actions';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/user/logout', {
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
            dispatch(userLogout());
            navigate('/user', { replace: true });
        }).catch((err) => {
            console.log(err);
        });
    });

    return <Navigate to="/user" replace />;
}

export default Logout