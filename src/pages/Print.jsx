import { useState, useEffect } from "react";
import { FaPrint } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NiceThingReader from "./../components/NiceThingReader";
import Spinner from "./../components/Spinner";

import {
    getUsers,
    getUserNiceThings,
    reset,
} from "../features/niceThings/niceThingSlice";

function Print() {
    const [receivingID, setReceivingID] = useState(0);
    const [shouldFetchUsers, setShouldFetchUsers] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { users, niceThings, isLoading, isError, message } = useSelector(
        (state) => state.niceThing
    );

    if (user) {
        if (!user.Admin) {
            navigate("/dashboard");
        }
    } else {
        navigate("/");
    }

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (shouldFetchUsers) {
            dispatch(getUsers());
            setShouldFetchUsers(false);
        }

        dispatch(reset());
    }, [shouldFetchUsers, isError, message, navigate, dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getUsers());
    }, [niceThings, isError, message, navigate, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (receivingID <= 0) {
            toast.error("Please select someone to print");
            return;
        }

        const userData = {
            Receiver: parseInt(receivingID),
        };

        dispatch(getUserNiceThings(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaPrint /> Print
                </h1>
                <p>Print Nice Things</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>To:</label>
                        <select
                            value={receivingID}
                            onChange={(e) => setReceivingID(e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {users.map((assister) => (
                                <option key={assister.ID} value={assister.ID}>
                                    {assister.FullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block" type="submit">
                            Submit Print Request
                        </button>
                    </div>
                </form>
                <div className="form-group">
                    {niceThings.map((niceThing) => (
                        <NiceThingReader
                            key={niceThing.ID}
                            niceThing={niceThing}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default Print;
