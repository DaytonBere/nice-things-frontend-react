import axios from "axios";

const API_URL = "https://nice-things-backend-test.onrender.com/api/niceThings/";

const getUsers = async (userData) => {
    const response = await axios.post(API_URL + "getUsers", userData, {
        crossDomain: true,
    });

    return response.data;
};

const createNiceThing = async (niceThingData) => {
    const response = await axios.post(
        API_URL + "createNiceThing",
        niceThingData,
        {
            crossDomain: true,
        }
    );

    return response.data;
};

const getUserNiceThings = async (userData) => {
    const response = await axios.post(API_URL + "getUserNiceThings", userData, {
        crossDomain: true,
    });

    return response.data;
};

const niceThingService = {
    getUsers,
    createNiceThing,
    getUserNiceThings,
};

export default niceThingService;
