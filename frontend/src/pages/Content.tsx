import { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import React from "react"
import Card from '../component/Card';
import UseContent from '../hooks/UseContent';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button as ShadButton } from '../components/ui/button'; // Avoid conflict with native <button>
import ShareIcon from '../icons/ShareIcon';
import PlusIcon from '../icons/PlusIcon';
 

function Dashboard() {
  const { contents, refresh } = UseContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
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

  const handleSave = () => {
    // Optional: Add logic to submit content
    console.log({ title, link });
    setModalOpen(false);
    setTitle('');
    setLink('');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        {/* Add Content Dialog */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="dialog-box">
            <DialogHeader>
              <DialogTitle>Add Content</DialogTitle>
              <DialogDescription>
                Enter content title and link to save it.
              </DialogDescription>
            </DialogHeader>
            <div className="dialog-inputs">
              <div className="form-row">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </div>
              <div className="form-row">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
            <DialogFooter>
              <ShadButton onClick={handleSave}>Save Content</ShadButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="dashboard-header">
          <div className="button-group">
            <button className="primary-btn" onClick={() => setModalOpen(true)}>
              <PlusIcon /> Add Content
            </button>
            <button className="secondary-btn">
              <ShareIcon /> Share Brain
            </button>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <button className="secondary-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="card-grid">
          {contents.map(({ type, link, title }) => (
            <Card key={link} link={link} title={title} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
