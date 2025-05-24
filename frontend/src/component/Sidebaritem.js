import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Sidebaritem({ text, icon, onClick }) {
    return (_jsxs("div", { className: "flex items-center mx-3 text-gray-700 pr-14 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-sm transition-all", onClick: onClick, children: [_jsx("div", { className: "px-2", children: icon }), _jsx("div", { className: "px-2", children: text })] }));
}
export default Sidebaritem;
