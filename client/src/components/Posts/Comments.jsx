import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';


const Comments = ({ postId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [isEditingComment, setIsEditingComment] = useState(null); 
  const [editedCommentText, setEditedCommentText] = useState(''); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comments?postId=${postId}`);
        setComments(response.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    try {
      const newCommentData = { postId, body: newComment,email: user.email };
      const response = await axios.post('http://localhost:3000/comments', newCommentData);
      setComments([...comments, response.data]);
      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError('Failed to add comment.');
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleSaveCommentChange = async (comment) => {
    if (!editedCommentText.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    try {
      const updatedComment = { ...comment, body: editedCommentText };
      const response = await axios.put(`http://localhost:3000/comments/${comment.id}`, updatedComment);
      setComments(comments.map((updateComment) => (updateComment.id === comment.id ? response.data : updateComment)));
      setIsEditingComment(null);
      setEditedCommentText('');
      setError('');
    } catch (err) {
      console.error('Failed to update comment:', err);
      setError('Failed to update comment.');
    }
  };

  return (
    <div>
      <h3>Comments for Post #{postId}</h3>

      <div>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>➕</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id} style={{ marginBottom: '10px' }}>
            {isEditingComment === comment.id ? (
              <>
                <input
                  type="text"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                  placeholder="Edit your comment"
                />
                <button onClick={() => handleSaveCommentChange(comment)}>✔️</button>
                <button onClick={() => setIsEditingComment(null)}>❌</button>
              </>
            ) : (
              <>
              <div>
              <strong>{comment.email}:</strong>
              </div>
                <span>{comment.body}</span>
                {comment.email === user.email && (
                  <>
                    <button onClick={() => {setIsEditingComment(comment.id),setEditedCommentText(comment.body)}} style={{ marginLeft: '10px' }}>
                      🖊️
                    </button>
                    <button onClick={() => handleDeleteComment(comment.id)} style={{ marginLeft: '10px' }}>
                      🗑️
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;


// || comment.body