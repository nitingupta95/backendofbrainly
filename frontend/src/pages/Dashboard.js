import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import Card from '../component/Card';
import UseContent from '../hooks/UseContent';
import { toast, Toaster } from "sonner";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogPortal, DialogOverlay, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../components/ui/select";
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button as ShadButton } from '../components/ui/button';
import ShareIcon from '../icons/ShareIcon';
import PlusIcon from '../icons/PlusIcon';
import { BACKEND_URL } from '@/config';
import axios from 'axios';
const isValidType = (t) => {
    return ["document", "link", "tweet", "youtube"].includes(t);
};
function Dashboard() {
    const { contents, refresh } = UseContent();
    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const userName = localStorage.getItem('name') || 'Guest';
    useEffect(() => {
        refresh();
    }, [modalOpen]);
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        alert('You have logged out successfully!');
        navigate('/signin');
    };
    const handleSaveContent = async () => {
        if (!title || !link || !type) {
            toast.error('Please fill in all fields');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }
            await axios.post(`${BACKEND_URL}/api/v1/content`, { id, title, link, type }, {
                headers: {
                    token: `${token}`,
                },
            });
            toast.success('Content saved successfully!', {
                className: "bg-green-100 border border-green-400 text-green-800 font-semibold",
            });
            setModalOpen(false);
            refresh();
        }
        catch (error) {
            toast.error('Error saving content');
        }
    };
    return (_jsxs("div", { className: "flex", children: [_jsx(Toaster, {}), _jsx(Sidebar, {}), _jsxs("div", { className: "p-4 ml-64 min-h-screen bg-gray-50 w-full border border-gray-200 box-border", children: [_jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: _jsxs(DialogPortal, { children: [_jsx(DialogOverlay, { className: "fixed inset-0 bg-black/60 backdrop-blur-sm" }), _jsxs(DialogContent, { className: "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-6 shadow-xl", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-2xl font-bold text-gray-900", children: "Add Content" }), _jsx(DialogDescription, { className: "mt-2 text-gray-600", children: "Enter content title, type and link to save it." })] }), _jsxs("div", { className: "mt-6 space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "id", children: "Id" }), _jsx(Input, { id: "id", value: id, onChange: (e) => setId(e.target.value), placeholder: "Enter id" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "Title" }), _jsx(Input, { id: "title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Enter title" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "type", children: "Type" }), _jsxs(Select, { value: type, onValueChange: setType, children: [_jsx(SelectTrigger, { className: "w-[180px] ", children: _jsx(SelectValue, { placeholder: "Select type" }) }), _jsxs(SelectContent, { className: 'bg-black text-white', children: [_jsx(SelectItem, { value: "document", children: "document" }), _jsx(SelectItem, { value: "tweet", children: "tweet" }), _jsx(SelectItem, { value: "youtube", children: "youtube" }), _jsx(SelectItem, { value: "link", children: "link" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "link", children: "Link" }), _jsx(Input, { id: "link", value: link, onChange: (e) => setLink(e.target.value), placeholder: "https://..." })] })] }), _jsx(DialogFooter, { className: "mt-8", children: _jsx(ShadButton, { onClick: handleSaveContent, children: "Save Content" }) })] })] }) }), _jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("button", { onClick: () => setModalOpen(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors", children: [_jsx(PlusIcon, {}), " Add Content"] }), _jsxs("button", { className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors", children: [_jsx(ShareIcon, {}), " Share Brain"] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-bold", children: userName.charAt(0).toUpperCase() }), _jsx("button", { onClick: logout, className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors", children: "Logout" })] })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: contents.map(({ id, type, link, title }) => isValidType(type) ? (_jsx(Card, { id: id, link: link, title: title, type: type }, id)) : null) })] })] }));
}
export default Dashboard;
