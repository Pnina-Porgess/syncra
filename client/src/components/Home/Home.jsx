import React from 'react';
import { useUser } from '../../contexts/UserContext';
import Navbar from '../Navbar/Navbar';
const Home = () => {
    const { user } = useUser();
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <Navbar />
    </div>
  );
};

export default Home;
