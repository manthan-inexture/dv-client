import { Link, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';


const UserRenderMenu = () => {
    return (
        <>
            <Link to='/user' className="navbar__item">Home</Link>
            <Link to='/user/profile' className="navbar__item">Profile</Link>
            <Link to='/user/dashboard' className="navbar__item">Dashboard</Link>
            <Link to='/user/logout' className="navbar__item">Logout</Link>
        </>
    )
}

const NavBar = () => {
    const userLoginStatus = useSelector(state => state.reducer.userLoginStatus);
    return (
        <>
        <header className="navbar">
            <Link to='/' className="navbar__title">User - Digital Validator</Link>
            {/* <Link to='/about' className="navbar__item">About Us</Link>
            <Link to='/contact' className="navbar__item">Contact</Link> */}
            {userLoginStatus ? <UserRenderMenu /> : ''}
        </header>
        <Outlet />
        </>
    )
};

export default NavBar;