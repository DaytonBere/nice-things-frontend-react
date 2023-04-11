import axios from "axios";

const API_URL = "http://localhost:4000/api/niceThings/";

const getUsers = async () => {
    const response = await axios.get(API_URL + "getUsers", {
        withCredentials: true,
    });

    return response.data;
};

const createNiceThing = async (niceThingData) => {
    const response = await axios.post(
        API_URL + "createNiceThing",
        niceThingData,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const getUserNiceThings = async (userData) => {
    const response = await axios.get(API_URL + "getUserNiceThings", {
        params: {
            Receiver: userData.Receiver,
        },
        withCredentials: true,
    });

    return response.data;
};

const niceThingService = {
    getUsers,
    createNiceThing,
    getUserNiceThings,
};

export default niceThingService;
