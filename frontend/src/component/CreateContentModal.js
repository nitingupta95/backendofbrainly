import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const CreateContentModal = ({ isOpen, onClose, onCreate }) => {
    const [content, setContent] = useState('');
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded shadow-lg w-96", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Create New Content" }), _jsx("textarea", { value: content, onChange: (e) => setContent(e.target.value), className: "border p-2 w-full h-24 rounded", placeholder: "Enter your content here..." }), _jsxs("div", { className: "flex justify-end gap-2 mt-4", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 bg-gray-300 rounded", children: "Cancel" }), _jsx("button", { onClick: () => {
                                onCreate(content);
                                setContent('');
                                onClose();
                            }, className: "px-4 py-2 bg-blue-500 text-white rounded", children: "Create" })] })] }) }));
};
export default CreateContentModal;
