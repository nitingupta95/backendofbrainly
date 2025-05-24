import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import ShareIcon from '../icons/ShareIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import TwitterIcon from '@/icons/TwitterIcon';
import LinkIcon from '@/icons/LinkIcon';
import DocumentIcon from '@/icons/DocumentIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import ExternalLInk from '@/icons/ExternalLInk';
import { toast } from 'sonner';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
function Card({ id, title, link, type }) {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!window.twttr) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            document.body.appendChild(script);
        }
        else {
            window.twttr.widgets?.load(containerRef.current);
        }
    }, [link]);
    const hanleShare = () => {
        navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard");
    };
    const confirmDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You need to be logged in to delete content");
            return;
        }
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
                data: { id },
                headers: { token },
            });
            toast.success("Content deleted successfully!", {
                className: "bg-green-100 border border-green-400 text-green-800 font-semibold",
            });
            setOpen(false);
            window.location.reload();
        }
        catch {
            toast.error("Failed to delete content");
        }
    };
    const renderMedia = () => {
        if (type === 'youtube') {
            const embedUrl = link.includes('youtu.be/')
                ? `https://www.youtube.com/embed/${link.split('youtu.be/')[1].split('?')[0]}`
                : link.replace('watch?v=', 'embed/');
            return (_jsx("iframe", { className: "w-full rounded-md mt-4", src: embedUrl, title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "no-referrer", allowFullScreen: true }));
        }
        if (type === 'document') {
            const fileId = link.split("/d/")[1]?.split("/")[0];
            const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            return (_jsx("iframe", { className: "w-full rounded-md mt-4", src: `https://docs.google.com/gview?url=${encodeURIComponent(directUrl)}&embedded=true`, title: "Document viewer", frameBorder: "0", allowFullScreen: true }));
        }
        if (type === 'tweet') {
            return (_jsx("div", { ref: containerRef, className: "mt-4", children: _jsx("blockquote", { className: "twitter-tweet", children: _jsx("a", { href: link.replace('x.com', 'twitter.com') }) }) }));
        }
        if (type === 'link') {
            return (_jsx("div", { className: "mt-4", children: _jsx("a", { href: link, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline break-words", children: link }) }));
        }
        return null;
    };
    return (_jsxs("div", { className: "p-4 bg-white rounded-md border-2 border-slate-300 max-w-72 min-h-48 min-w-72", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center pr-2 text-md", children: [type === "youtube" && _jsx(YoutubeIcon, { className: "pr-2 text-black size-5" }), type === "tweet" && _jsx(TwitterIcon, { className: "pr-2 text-black size-5" }), type === "link" && _jsx(LinkIcon, { className: "pr-2 text-black size-5" }), type === "document" && _jsx(DocumentIcon, { className: "pr-2 text-black size-5" }), _jsx("span", { className: "font-medium text-black", children: title })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "pr-2 text-gray-500 cursor-pointer", onClick: hanleShare, children: _jsx(ShareIcon, {}) }), _jsx("div", { className: "pr-2 text-gray-500 cursor-pointer", onClick: () => setOpen(true), children: _jsx(DeleteIcon, {}) }), _jsx("a", { href: link, target: "_blank", rel: "noopener noreferrer", className: "pr-2 text-gray-500 cursor-pointer", children: _jsx(ExternalLInk, {}) })] })] }), renderMedia(), _jsx(Dialog, { open: open, onOpenChange: setOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[400px] bg-white", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Are you sure?" }), _jsx(DialogDescription, { children: "Do you really want to delete this item? This action cannot be undone." })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", className: 'bg-black text-white', onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { variant: "destructive", className: "bg-violet-700 text-white", onClick: confirmDelete, children: "Delete" })] })] }) })] }));
}
export default Card;
