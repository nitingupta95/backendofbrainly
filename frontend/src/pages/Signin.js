import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
function Signin() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token)
            navigate('/dashboard');
    }, [navigate]);
    async function signin() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, { email, password });
            const { token, name: responseName } = response.data;
            if (!token)
                throw new Error('No token received');
            localStorage.setItem('token', token);
            localStorage.setItem('name', name || responseName || 'Guest');
            alert('Signed in successfully!');
            navigate('/dashboard');
        }
        catch (error) {
            alert(error.response?.data?.message || 'Signin error occurred.');
        }
    }
    return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-gray-50", children: _jsxs("div", { className: "bg-white p-10 rounded-lg shadow-xl w-full max-w-md", children: [_jsx("h1", { className: "text-2xl font-bold text-center mb-5", children: "Welcome Back" }), _jsx("input", { type: "text", placeholder: "Username", value: name, onChange: e => setName(e.target.value), className: "w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: e => setEmail(e.target.value), className: "w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: e => setPassword(e.target.value), className: "w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" }), _jsx("button", { onClick: signin, className: "w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: "Sign In" }), _jsxs("p", { className: "mt-5 text-center text-sm", children: ["Don't have an account?", ' ', _jsx("a", { href: "/signup", className: "text-blue-600 hover:underline", children: "Sign up" })] })] }) }));
}
export default Signin;
