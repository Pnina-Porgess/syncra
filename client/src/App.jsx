import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/Connection/Login';
import Register from './components/Connection/Register';
import Home from './components/Home/Home';
import Todos from './components/Todos/Todos';
import Posts from './components/Posts/Posts';
import Albums from './components/Albums/Albums';
import { UserProvider } from './contexts/UserContext';
import UserInfo from './components/UserInfo/UserInfo';
import Photos from './components/Albums/Photos';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <>
<UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users/:userId"  >
        <Route path="todos" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
        <Route path="posts/" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="albums" element={<ProtectedRoute><Albums /></ProtectedRoute>} />
        <Route path="userInfo" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
        <Route path="albums/:albumId/photos" element={<ProtectedRoute><Photos /></ProtectedRoute>} />
        </Route>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
 </UserProvider>
    </>
  );
};

export default App;

