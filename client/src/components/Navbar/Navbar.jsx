import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { useUser } from '../../contexts/UserContext'

const Navbar = () => {
  const navigate = useNavigate();
  const { user,logout } = useUser(); 

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true }); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link className={styles.link} to={`/users/${user.id}/todos`}>Todos</Link>
        <Link className={styles.link} to={`/users/${user.id}/posts`}>Posts</Link>
        <Link className={styles.link} to={`/users/${user.id}/albums`}>Albums</Link>
        <Link className={styles.link} to={`/users/${user.id}/userInfo`}>userInfo</Link>
      </div>
      <span className={styles.name}>hi {user.username}!</span>
      <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;