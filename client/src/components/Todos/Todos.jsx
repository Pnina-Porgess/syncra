import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import Navbar from '../Navbar/Navbar';
import styles from './Todos.module.css'

const Todos = () => {

  const [todos, setTodos] = useState([]); // רשימת TODOS
  const [filter, setFilter] = useState(''); // חיפוש
  const [filterCriteria, setFilterCriteria] = useState('title'); // קריטריון חיפוש
  const [sortCriteria, setSortCriteria] = useState(''); // קריטריון מיון
  const [newTodoTitle, setNewTodoTitle] = useState(''); // יצירת TODO חדש
  const [editingTodoId, setEditingTodoId] = useState(null); //איחוד
  const [editingTitle, setEditingTitle] = useState(''); //איחוד
  const { user } = useUser();
  const [displayTodos, setDisplayTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todos?userId=${user.id}`);
        setTodos(response.data);
        setDisplayTodos(response.data)
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };
    fetchTodos();
  }, [user.id]);

  const filterTodos = (todosList) => {
    if (!filter) return todosList;
    return todosList.filter((todo) => {
      if (filterCriteria === 'id') return todo.id.toString().includes(filter);
      if (filterCriteria === 'title') return todo.title.includes(filter);
      if (filterCriteria === 'completed') return todo.completed.toString() === filter;
    });
  };

  const sortTodos = (todosList) => {
    return [...todosList].sort((a, b) => {
      if (sortCriteria === 'id') return a.id - b.id;
      if (sortCriteria === 'title') return a.title.localeCompare(b.title);
      if (sortCriteria === 'completed') return a.completed - b.completed;
    });
  };

  useEffect(() => {
    setDisplayTodos(filterTodos(todos));
  }, [todos, filter]);

  useEffect(() => {
    setDisplayTodos(sortTodos(todos));
  }, [todos,sortCriteria]);

  const handleAddTodo = async () => {
    const newTodo = { userId: user.id, title: newTodoTitle, completed: false };
    try {
      const response = await axios.post('http://localhost:3000/todos', newTodo);
      setTodos([...todos, response.data]);
      setNewTodoTitle('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleUpdateTodo = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:3000/todos/${todo.id}`, updatedTodo);
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };
  const handleSaveTodo = async (todo) => {
    try {
      const updatedTodo = { ...todo, title: editingTitle };
      const response = await axios.put(`http://localhost:3000/todos/${todo.id}`, updatedTodo);
      setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
      setEditingTodoId(null);
      setEditingTitle('');
    } catch (err) {
      console.error('Failed to save todo:', err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.todosHeader}>
      <div className={styles.newTodoContainer}>
      <div>
        <input
          type="text"
          placeholder="New todo title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>➕</button>
      </div>
      </div>
      <div className={styles.searchContainer}>
        <h1 className={styles.titleTodos}>Todos</h1>
        <input
          type="text"
          placeholder="Search todos"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select onChange={(e) => setFilterCriteria(e.target.value)}>
          <option value="title">By Title</option>
          <option value="id">By ID</option>
          <option value="completed">By Completion</option>
        </select>
      </div>
      <div className={styles.showTodosContainer}>
        <label>Sort by: </label>
        <select onChange={(e) => setSortCriteria(e.target.value)}>
        <option value=""></option>
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="completed">Completion</option>
        </select>
      </div>
      </div>
      <div  className={styles.todosContainer}>
        {displayTodos.map((todo) => (
          <div key={todo.id} className={styles.todoCard}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>#{todo.id}</span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdateTodo(todo)}
              style={{ marginRight: '10px' }}
            />
      
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <button onClick={() => handleSaveTodo(todo)}>✔️</button>
              </>
            ) : (
              <>
                <span style={{ marginRight: '10px' }}>{todo.title}</span>
                <button onClick={() =>{setEditingTodoId(todo.id),setEditingTitle(todo.title)}}>🖋️</button>
              </>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ marginLeft: '10px' }}>🗑️</button>
            </div>
  
        ))}
      </div>
    </div>
  );
};

export default Todos;
