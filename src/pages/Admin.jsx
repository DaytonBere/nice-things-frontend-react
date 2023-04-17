import { useState, useEffect } from "react";
import { FaAtom } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "./../features/auth/authSlice";
import Spinner from "./../components/Spinner";

function Admin() {
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
    });

    const { FirstName, LastName, Email } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user) {
            if (!user.Admin) {
                navigate("/dashboard");
            }
        } else {
            navigate("/");
        }

        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success("User successfully created");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            FirstName,
            LastName,
            Email,
            Admin: false,
            Sender: user.ID,
        };

        dispatch(register(userData));

        setFormData({
            FirstName: "",
            LastName: "",
            Email: "",
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaAtom /> Admin
                </h1>
                <p>Account creator</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="body">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="FirstName"
                            name="FirstName"
                            value={FirstName}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="body">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="LastName"
                            name="LastName"
                            value={LastName}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="body">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="Email"
                            name="Email"
                            value={Email}
                            onChange={onChange}
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

export default Admin;
