import {
    FaSignInAlt,
    FaSignOutAlt,
    FaAtom,
    FaFolderPlus,
    FaPrint,
    FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "./../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    const renderItems = () => {
        if (user) {
            if (user.Admin) {
                return (
                    <>
                        <>
                            <li>
                                <Link to="/admin">
                                    <FaAtom /> Admin
                                </Link>
                            </li>
                        </>
                        <>
                            <li>
                                <Link to="/print">
                                    <FaPrint /> Print
                                </Link>
                            </li>
                        </>
                        <>
                            <li>
                                <Link to="/changePassword">
                                    <FaLock /> Change Password
                                </Link>
                            </li>
                        </>
                        <>
                            <li>
                                <button className="btn" onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </>
                    </>
                );
            } else {
                return (
                    <>
                        <>
                            <li>
                                <Link to="/nicething">
                                    <FaFolderPlus /> Create Nice Thing
                                </Link>
                            </li>
                        </>
                        <>
                            <li>
                                <Link to="/changePassword">
                                    <FaLock /> Change Password
                                </Link>
                            </li>
                        </>
                        <>
                            <li>
                                <button className="btn" onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </>
                    </>
                );
            }
        } else {
            return (
                <>
                    <li>
                        <Link to="/">
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                </>
            );
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to={user ? "/dashboard" : "/"}>Assist Nice Things</Link>
            </div>
            <ul>{renderItems()}</ul>
        </header>
    );
}

export default Header;
