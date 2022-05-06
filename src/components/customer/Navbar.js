import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const CusRenderMenu = () => {
    return (
        <>
            <Link to='/customer' className="navbar__item">Home</Link>
            <Link to='/customer/profile' className="navbar__item">Profile</Link>
            <Link to='/customer/dashboard' className="navbar__item">Dashboard</Link>
            <Link to='/customer/scan' className="navbar__item">QR Scanner</Link>
            <Link to='/customer/logout' className="navbar__item">Logout</Link>
        </>
    )
}

const NavBar = () => {
    const cusLoginStatus = useSelector(state => state.reducer.cusLoginStatus);
    return (
        <header className="navbar">
            <Link to='/' className="navbar__title">Customer - Digital Validator</Link>
            {/* <Link to='/about' className="navbar__item">About Us</Link>
            <Link to='/contact' className="navbar__item">Contact</Link> */}
            {cusLoginStatus ? <CusRenderMenu /> : ''}
        </header>
    )
};

export default NavBar;