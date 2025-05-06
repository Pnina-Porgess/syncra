import React, { useState } from 'react';
import axios from 'axios';
import Comments from './Comments';
import styles from './Posts.module.css';
import { useUser } from '../../contexts/UserContext';

const PostDetails = (props) => {
  const { post, setSelectedPost, setPosts } = props;
  const { user } = useUser();
  const [editedPost, setEditedPost] = useState({ title: post.title, body: post.body });
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState({ title: false, body: false });

  const handleEditPost = async (field) => {
    try {
      const updatedPost = { ...post, [field]: editedPost[field] };
      const response = await axios.put(`http://localhost:3000/posts/${post.id}`, updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, ...response.data } : p
        )
      );
      setSelectedPost(response.data);
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (err) {
      console.error(`Failed to edit ${field}:`, err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.selectedPostModal}>
        <div className={styles.postDetailsHeader}>
          <h3>Post Details</h3>
          <button onClick={() => setSelectedPost(null)}>✖️</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isEditing.title ? (
            <>
              <input
                type="text"
                value={editedPost.title}
                onChange={(e) =>
                  setEditedPost((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <button onClick={() => handleEditPost('title')} style={{ marginLeft: '10px' }}>
                ✔️
              </button>
            </>
          ) : (
            <>
              <p style={{ marginRight: '10px' }}>
                <strong>Title:</strong> {post.title}
              </p>
              {user.id == post.userId && (
                <button onClick={() => setIsEditing((prev) => ({ ...prev, title: true }))}>✏️</button>
              )}
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isEditing.body ? (
            <>
              <input
                value={editedPost.body}
                onChange={(e) =>
                  setEditedPost((prev) => ({ ...prev, body: e.target.value }))
                }
                style={{ marginRight: '10px' }}
              />
              <button onClick={() => handleEditPost('body')}>✔️</button>
            </>
          ) : (
            <>
              <p style={{ marginRight: '10px' }}>
                <strong>Body:</strong> {post.body || 'No body content.'}
              </p>
              {user.id == post.userId && (
                <button onClick={() => setIsEditing((prev) => ({ ...prev, body: true }))}>✏️</button>
              )}
            </>
          )}
        </div>
        <button onClick={() => setShowComments((prev) => !prev)}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
        {showComments && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default PostDetails;
