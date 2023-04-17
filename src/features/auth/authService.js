import axios from "axios";
const API_URL = "https://nice-things-backend-test.onrender.com/api/user/";

const logout = () => {
    localStorage.removeItem("user");
};

const login = async (userData) => {
    const response = await axios.post(API_URL + "signIn", userData, {
        crossDomain: true,
    });

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const register = async (userData) => {
    const response = await axios.post(API_URL + "signUp", userData, {
        crossDomain: true,
    });

    return response.data;
};

const changePassword = async (userData) => {
    const response = await axios.patch(API_URL + "changePassword", userData, {
        crossDomain: true,
    });

    return response.data;
};

const authService = {
    login,
    logout,
    register,
    changePassword,
};

export default authService;
