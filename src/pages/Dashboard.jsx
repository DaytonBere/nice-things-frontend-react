import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getUsers, reset } from "../features/niceThings/niceThingSlice";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { users, isLoading, isError, message } = useSelector(
        (state) => state.niceThing
    );

    const [shouldFetchUsers, setShouldFetchUsers] = useState(true);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/");
        }

        if (shouldFetchUsers) {
            dispatch(getUsers());
            setShouldFetchUsers(false);
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch, shouldFetchUsers]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user.Name}</h1>
                <p>Nice Things Dashboard</p>
            </section>
            {user.Admin ? (
                <section className="content">
                    <label>Roster:</label>
                    <ul>
                        <div className="goals">
                            {users.map((assister) => (
                                <li key={assister.ID}>{assister.FullName}</li>
                            ))}
                        </div>
                    </ul>
                </section>
            ) : (
                <section className="content">
                    <label>Submitted Nice Things:</label>
                    <ul>
                        <div className="goals">
                            {users.map((assister) =>
                                assister.SentNiceThing ? (
                                    <li key={assister.ID}>
                                        {assister.FullName}
                                    </li>
                                ) : (
                                    ""
                                )
                            )}
                        </div>
                    </ul>
                    <label>To-Do Nice Things:</label>
                    <ul>
                        <div className="goals">
                            {users.map((assister) =>
                                !assister.SentNiceThing ? (
                                    <li key={assister.ID}>
                                        {assister.FullName}
                                    </li>
                                ) : (
                                    ""
                                )
                            )}
                        </div>
                    </ul>
                </section>
            )}
        </>
    );
}

export default Dashboard;
