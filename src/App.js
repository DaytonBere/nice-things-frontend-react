import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NiceThing from "./pages/NiceThing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Print from "./pages/Print";
import ChangePassword from "./pages/ChangePassword";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/nicething" element={<NiceThing />} />
                        <Route path="/print" element={<Print />} />
                        <Route
                            path="/changePassword"
                            element={<ChangePassword />}
                        />
                    </Routes>
                    <Footer />
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
