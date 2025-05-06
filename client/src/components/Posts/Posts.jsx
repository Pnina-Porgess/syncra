import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import PostDetails from './PostDetails';
import { useUser } from '../../contexts/UserContext'
import styles from './Posts.module.css';

const Posts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [displayPosts, setDisplayPosts] = useState([]);
  const [error, setError] = useState('');
  const [showAllPosts, setShowAllPosts] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
        handleShowUserPosts();
    };
    fetchUserPosts();
  }, [user?.id]);

  useEffect(() => {
    if(!searchQuery)
      setDisplayPosts(posts);
   else setDisplayPosts( posts.filter((post) =>
      post.id.toString().includes(searchQuery) || post.title.includes(searchQuery))
    );
  }, [posts, searchQuery]);

  const handleShowAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
      setShowAllPosts(true);
    } catch (err) {
      console.error('Failed to fetch all posts:', err);
    }
  };

  const handleShowUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts?userId=${user.id}`);
      setPosts(response.data);
      setShowAllPosts(false);
    } catch (err) {
      console.error('Failed to fetch user posts:', err);
    }
  };

  const handleAddPost = async () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      setError('Title and Body cannot be empty.');
      return;
    }
    try {
      const newPostData = { userId: user.id, title: newPost.title, body: newPost.body };
      const response = await axios.post('http://localhost:3000/posts', newPostData);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', body: '' });
      setError('');
    } catch (err) {
      console.error('Failed to add post:', err);
      setError('Failed to add post.');
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(null);
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className={styles.postsHeader}>
      <Navbar />
      <div className={styles.headerP}>
      <div className={styles.newPostContainer}>
        <input
          type="text"
          placeholder="New Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
     
        <input
          placeholder="New Post Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />

        <button onClick={handleAddPost}>➕</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <span className={styles.showPostsContainer}>
        <h1>Posts</h1>
        <div>
        {!showAllPosts ? (
          <button onClick={handleShowAllPosts}>Show All Posts</button>
        ) : (
          <button onClick={handleShowUserPosts}>Show My Posts Only</button>
        )}
        </div>
      </span>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID or Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
  </div>
      <div className={styles.postsContainer}>
        {displayPosts.map((post) => (
           <div key={post.id} className={styles.postCard}>
            <span >{post.id}</span>
            <span>{post.title}</span>
            <div>
            <button onClick={() => setSelectedPost(post)} style={{ marginLeft: '10px' }}>...</button>
            {user.id == post.userId && (
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{ marginLeft: '10px', color: 'red' }}>🗑️
              </button>)}
              </div>
          </div>
        ))}
      </div>
      {selectedPost && (
        <PostDetails post={selectedPost} setSelectedPost={setSelectedPost} setPosts={setPosts}/>
      )}
    </div>
  );
};

export default Posts;
