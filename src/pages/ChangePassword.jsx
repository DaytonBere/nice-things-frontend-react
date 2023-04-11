import { FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword, reset } from "./../features/auth/authSlice";
import Spinner from "./../components/Spinner";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!user) {
            dispatch("/");
        }

        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success("Password successfully updated");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            oldPassword.length === 0 ||
            newPassword1.length === 0 ||
            newPassword2.length === 0
        ) {
            toast.error("Please fill out all fields");
            return;
        }

        if (newPassword1 !== newPassword2) {
            toast.error("Passwords must match");
            return;
        }

        const userData = {
            OldPassword: oldPassword,
            NewPassword: newPassword1,
        };

        dispatch(changePassword(userData));

        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaLock /> Change Password
                </h1>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="body">Old Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="oldPassword"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="body">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword1"
                            name="newPassword1"
                            value={newPassword1}
                            onChange={(e) => setNewPassword1(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="body">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword2"
                            name="newPassword2"
                            value={newPassword2}
                            onChange={(e) => setNewPassword2(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default ChangePassword;
