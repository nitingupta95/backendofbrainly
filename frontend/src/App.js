import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Signup, {}) }), _jsx(Route, { path: '/signin', element: _jsx(Signin, {}) }), _jsx(Route, { path: '/dashboard', element: _jsx(Dashboard, {}) })] }) }));
}
