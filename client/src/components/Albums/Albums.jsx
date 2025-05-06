import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Navbar from '../Navbar/Navbar';
import styles from './Albums.module.css';

const Albums = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [displayAlbums,setDisplayAlbums]=useState([]);

    useEffect(() => {
            const fetchAlbums = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/albums?userId=${user.id}`);
                    setAlbums(response.data);
                    setDisplayAlbums(response.data)
                } catch (err) {
                    console.error('Failed to fetch albums:', err);
                    setError('Failed to load albums.');
                }
            };
            fetchAlbums();
    }, [user]);

    useEffect(() => {
    setDisplayAlbums(albums.filter(
        (album) =>
            album.id.toString().includes(searchTerm) || album.title.includes(searchTerm)
    )
    );
    },[searchTerm])

    const handleAlbumClick = (albumId) => {
        navigate(`/users/${user.id}/albums/${albumId}/photos`);
    };

    const handleCreateAlbum = async () => {
        if (!newAlbumTitle.trim()) return;
        try {
            const response = await axios.post('http://localhost:3000/albums', {
                userId: user.id, 
                title: newAlbumTitle,
            });
            setAlbums([...albums, response.data]);
            setDisplayAlbums([...albums, response.data]);
            setNewAlbumTitle('');
        } catch (err) {
            console.error('Failed to create album:', err);
            setError('Failed to create album.');
        }
    };
    return (
        <>
            <Navbar />
            <div className={styles.albumsContainer}>
                <div className={styles.albumsHeader}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className={styles.createAlbumContainer}>
                <input type="text" value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}  placeholder="New Album Title"/>
                <div>
                <button onClick={handleCreateAlbum}>➕</button>
                </div>
            </div>
            <h1 >Albums</h1>
            <div className={styles.searchContainer}>
                <input type="text"
                    placeholder="Search by ID or Title"
                    value={searchTerm}
                    onChange={ (e)=>setSearchTerm(e.target.value)}
                />
            </div>
            </div>
            <div className={styles.albumList}>
                {displayAlbums.map((album) => (
                    <div key={album.id} className={styles.albumItem}>
                        <button onClick={() => handleAlbumClick(album.id)}>
                           {album.id}: {album.title}
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Albums;
