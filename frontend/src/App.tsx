import { useState } from 'react' 
// import './App.css'
import './index.css';

import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Content from './pages/Content';
import{Dialog,DialogContent} from "../src/components/ui/dialog"
function App() { 
  return <BrowserRouter>
  <Routes>
    <Route path='/*' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/content' element={<Content/>}/>

  </Routes>
 
  
</BrowserRouter>
}
export default App;