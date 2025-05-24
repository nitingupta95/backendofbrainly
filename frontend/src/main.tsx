
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';  

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// using useQuery
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import './index.css'
// import App from './App.tsx'
// const queryClient= new QueryClient();

// createRoot(document.getElementById('root')!).render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>,
// )
