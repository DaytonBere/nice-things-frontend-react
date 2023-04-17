import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    createNiceThing,
    getUsers,
    reset,
} from "./../features/niceThings/niceThingSlice";
import { FaFolderPlus } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function NiceThing() {
    const [receivingID, setReceivingID] = useState(0);
    const [text, setText] = useState("");
    const [shouldFetchUsers, setShouldFetchUsers] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { users, isLoading, isError, message } = useSelector(
        (state) => state.niceThing
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
            navigate("/");
        }

        const userData = {
            Sender: user.ID,
        };

        if (shouldFetchUsers) {
            dispatch(getUsers(userData));
            setShouldFetchUsers(false);
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch, shouldFetchUsers]);

    if (isLoading) {
        return <Spinner />;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (receivingID === null) {
            toast.error("Please select someone to send your Nice Thing to");
            return;
        }

        if (!text) {
            toast.error("Please fill out your Nice Thing");
            return;
        }

        const niceThingData = {
            Sender: user.ID,
            Receiver: parseInt(receivingID),
            Body: text,
        };

        dispatch(createNiceThing(niceThingData));
        navigate("/dashboard");
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaFolderPlus /> Create Nice Thing
                </h1>
                <p>Account creator</p>
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
                            {users
                                .filter((assister) => !assister.SentNiceThing)
                                .map((assister) => (
                                    <option
                                        key={assister.ID}
                                        value={assister.ID}
                                    >
                                        {assister.FullName}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="body">Message</label>
                        <input
                            type="text"
                            className="form-control"
                            id="text"
                            name="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block" type="submit">
                            Submit Nice Thing
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default NiceThing;
