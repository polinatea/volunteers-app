import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import Profile from './pages/Profile'
import Chats from './pages/Chats'
import Login from './pages/Login';
import React, {useState} from 'react'
import {Route,Routes,Navigate} from "react-router-dom"

function App() {
  const isAuthenticated = localStorage.getItem('token');
  console.log("sjdjfjdsfhsfb",isAuthenticated)
  const [token, setToken] = useState('')
 const userLogin = (tok) =>{
  setToken(tok);
  localStorage.setItem('token', tok);
 }
console.log("token from appjs",token);

  return (

    <div className="App">
        <Header />
        <div className='container-elem'>
          <Routes>
            
            <Route path='/login' element={<Login userLogin = {userLogin}/>} />
            
            <Route path='/events' element={localStorage.getItem('token')? <NotesListPage/>:<Navigate to="/login"/>}/>
            <Route path='/profile' element={localStorage.getItem('token')?<Profile />:<Navigate to="/login"/>}/>
            <Route path='/chats' element={<Chats />}/>
            
              

          </Routes>
        </div>
        
    </div>
  );

}

export default App;
