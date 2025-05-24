import React from "react"
import  { useState } from 'react';

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (content: string) => void;
}

const CreateContentModal: React.FC<CreateContentModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [content, setContent] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Content</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full h-24 rounded"
          placeholder="Enter your content here..."
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button 
            onClick={() => { 
              onCreate(content);
              setContent('');
              onClose();
            }} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContentModal;
