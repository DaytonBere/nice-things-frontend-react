import axios from "axios";
import Cookies from "js-cookie";
const API_URL = "https://nice-things-backend-test.onrender.com/api/user/";

const logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("Authorization");
};

const login = async (userData) => {
    const response = await axios.post(API_URL + "signIn", userData, {
        withCredentials: true,
    });

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        Cookies.set("Authorization", response.data.Token);
    }

    return response.data;
};

const register = async (userData) => {
    const response = await axios.post(API_URL + "signUp", userData, {
        withCredentials: true,
    });

    return response.data;
};

const changePassword = async (userData) => {
    const response = await axios.patch(API_URL + "changePassword", userData, {
        withCredentials: true,
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
