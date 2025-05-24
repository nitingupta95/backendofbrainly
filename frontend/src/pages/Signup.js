import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Input from '../component/Input';
import { Button } from '../components/ui/button';
import { BACKEND_URL } from '../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);
    async function signup() {
        if (!name || !email || !password) {
            setError("Please fill all fields.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, { name, email, password });
            alert(res.data.message || "You have signed up!");
            navigate("/signin");
        }
        catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            }
            else if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("Signup failed. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-gray-50", children: _jsxs("div", { className: "bg-white p-10 rounded-lg shadow-xl w-full max-w-md", children: [_jsx("h1", { className: "text-2xl font-bold text-center mb-5", children: "Sign Up" }), error && _jsx("p", { className: "text-red-500 text-center mb-4", children: error }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Username", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx(Button, { onClick: signup, className: "w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors", disabled: loading, children: loading ? 'Signing Up...' : 'Sign Up' })] }), _jsxs("p", { className: "mt-5 text-center text-sm", children: ["Already have an account?", ' ', _jsx("a", { href: "/signin", className: "text-blue-600 hover:underline", children: "Sign in" })] })] }) }));
}
export default Signup;
