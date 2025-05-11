import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import styles from './Photos.module.css'
const Photos = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [currentStart, setCurrentStart] = useState(0);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', thumbnailUrl: '' });
  const [editPhoto, setEditPhoto] = useState({ photoId: null, title: '' });
  const [loadMore, setLoadMore] = useState(true);
  const countPhotosToLoad = 8; 
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/photos?albumId=${albumId}&_start=${currentStart}&_limit=${countPhotosToLoad}`);
        if (response.data.length === 0) {
          setLoadMore(false);
        }
        if (currentStart === 0) {
          setPhotos(response.data);
        } else {
          setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
        }
      } catch (err) {
        console.error('Failed to fetch photos:', err);
        setError('Failed to load photos.');
      }
    };
    fetchPhotos();
  }, [albumId, currentStart]);

  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(`http://localhost:3000/photos/${photoId}`);
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (err) {
      console.error('Failed to delete photo:', err);
      setError('Failed to delete photo.');
    }
  };

  const handleSaveTitle = async (photoId) => {
    try {
      await axios.put(`http://localhost:3000/photos/${photoId}`, {
        title: editPhoto.title
      });
      setPhotos(
        photos.map((photo) =>
          photo.id === photoId ? { ...photo, title: editPhoto.title } : photo
        )
      );
      setEditPhoto({ photoId: null, title: '' });
    } catch (err) {
      console.error('Failed to edit photo title:', err);
      setError('Failed to edit photo title.');
    }
  };

  const handleAddPhoto = async () => {
    if (!newPhoto.title || !newPhoto.url || !newPhoto.thumbnailUrl) return;
    try {
      const response = await axios.post('http://localhost:3000/photos', {
        albumId,
        ...newPhoto,
      });
      setPhotos([...photos, response.data]);
      setNewPhoto({ title: '', url: '', thumbnailUrl: '' });
    } catch (err) {
      console.error('Failed to add photo:', err);
      setError('Failed to add photo.');
    }
  };

  const loadMorePhotos = () => {
    setCurrentStart((prevPage) => prevPage + countPhotosToLoad);
  };

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.photosHeader}>
        <div className={styles.addPhotoSection}>
        <input
          type="text"
          placeholder="Title"
          value={newPhoto.title}
          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPhoto.url}
          onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={newPhoto.thumbnailUrl}
          onChange={(e) => setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })}
        />
        <button onClick={handleAddPhoto}>Add Photo</button>
        </div>
        <h1 className={styles.albumHeader}>Photos in Album #{albumId}</h1>
      <button  className={styles.backButton} onClick={() => window.history.back()}>Back to Albums</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className={styles.photosGrid}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.photoCard}>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className={styles.thumbnail}
            />
            {editPhoto.photoId === photo.id ? (
              <div>
                <input
                  type="text"
                  value={editPhoto.title}
                  onChange={(e) =>
                    setEditPhoto((prevState) => ({ ...prevState, title: e.target.value }))
                  }
                />
                <button onClick={() => handleSaveTitle(photo.id)}>✔️</button>
                <button onClick={() => setEditPhoto({ photoId: null, title: '' })}>❌</button>
              </div>
            ) : (
             <>
                <p>{photo.title}</p>
                <button onClick={() =>setEditPhoto({ photoId: photo.id, title: photo.title })}>✏️</button>
                </>
            )}
            <button onClick={() => handleDeletePhoto(photo.id)}>🗑️</button>
          </div>
        ))}
      </div>

      {/* כפתור מעבר לדף הבא */}
      {loadMore && <button className={styles.loadMoreButton}   onClick={loadMorePhotos}>Load More Photos</button>}
      {!loadMore && <h4 className={styles.noMorePhotos}>no more photos yet ☹️</h4>}
    </div>
  );
};

export default Photos;
