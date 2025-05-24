import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
}

export default function UseContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const navigate = useNavigate();

  const refresh = useCallback(async () => {
     const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }
      console.log("Token used for request:", token);

      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            token: `${token}`,
          },
        });
        setContents(response.data.content);
      } catch (error) {
        console.error("Error fetching content:", error);
        alert("Failed to fetch content. Please try again.");
      }
       
    
  }, [navigate]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { contents, refresh };
}