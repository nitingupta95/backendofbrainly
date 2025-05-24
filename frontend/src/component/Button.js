import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const variantsClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-purple-300 text-purple-600 hover:bg-purple-400',
};
const defaultStyles = 'px-4 py-2 rounded-md font-medium transition duration-200';
function Button({ variants, text, startIcon, onClick, fullWidth = false, loading = false, disabled = false, }) {
    return (_jsx("button", { onClick: onClick, disabled: loading || disabled, className: `${variantsClasses[variants]} ${defaultStyles} ${fullWidth ? 'w-full' : ''} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`, children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [startIcon, text] }) }));
}
export default Button;
