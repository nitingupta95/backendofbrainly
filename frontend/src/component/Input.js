import { jsx as _jsx } from "react/jsx-runtime";
const Input = ({ type, placeholder, value, onChange, className = '' }) => {
    return (_jsx("input", { type: type, placeholder: placeholder, value: value, onChange: onChange, className: `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}` }));
};
export default Input;
