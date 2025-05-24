import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebaritem from './Sidebaritem';
import TwitterIcon from '../icons/TwitterIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import brainIcon from '../icons/brain.png';
import DocumentIcon from '@/icons/DocumentIcon';
import LinkIcon from '@/icons/LinkIcon';
function Sidebar() {
    const handleTwitter = () => {
    };
    return (_jsxs("div", { className: "h-screen bg-white border-r border-gray-200 w-64 fixed left-0 top-0", children: [_jsxs("div", { className: "flex items-center p-4", children: [_jsx("img", { className: "h-8 w-8 mr-2.5", src: brainIcon, alt: "Brain Icon" }), _jsx("h1", { className: "text-2xl text-purple-600 font-bold", children: "Brainly" })] }), _jsxs("div", { className: "pt-4", children: [_jsx(Sidebaritem, { text: 'Twitter', icon: _jsx(TwitterIcon, {}) }), _jsx(Sidebaritem, { text: 'Youtube', icon: _jsx(YoutubeIcon, {}) }), _jsx(Sidebaritem, { text: 'Document', icon: _jsx(DocumentIcon, {}) }), _jsx(Sidebaritem, { text: 'Links', icon: _jsx(LinkIcon, {}) })] })] }));
}
export default Sidebar;
