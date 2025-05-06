import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext'; 
import axios from 'axios'; 
import Navbar from '../Navbar/Navbar';
const UserInfo = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {  
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/users/${user.id}`);
          setUserData(response.data);  
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);  

  if (!userData) {
    return <p>Loading user data...</p>; 
  }

  return (
    <div>
        <Navbar/>
      <h3>User Information</h3>
      <ul>
        <li><strong>Username:</strong> {userData.username}</li>
        <li><strong>Full Name:</strong> {userData.name}</li>
        <li><strong>Email:</strong> {userData.email}</li>
        <li><strong>Phone:</strong> {userData.phone}</li>
      </ul>
    </div>
  );
};

export default UserInfo;
