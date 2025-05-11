const pool = require('../../db/db.js');

const usersService = {
  getAllUsers: async () => {
    return await  pool.query('SELECT id, username, name, email FROM users');
  },
  getUserById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]; // מחזיר את המשתמש הראשון (אם קיים)
  },
  createUser: async (username, name, email,phone) => {
   return pool.query('INSERT INTO users (username, name, email,phone) VALUES (?, ?, ?,?)', [username, name, email,phone]);
   
  },

  updateUser: async (id, username, name, email) => {
    return pool.query('UPDATE users SET username = ?, name = ?, email = ? WHERE id = ?', [username, name, email, id]);
  },

  deleteUser: async (id) => {
    return pool.query('DELETE FROM users WHERE id = ?', [id]);
  },
  createPassword: async (userId, passwordHash) => {
    try {
      const [result] = await pool.query('INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)', [userId, passwordHash]);
      console.log("Password inserted, result:", result);
      return result;
    } catch (error) {
      console.error("Error in createPassword:", error);
      throw error;
    }
  },
  getUserByUsername: async (username) => {
    const [rows] = await pool.query('SELECT id, username, name, email FROM users WHERE username = ?', [username]);
    console.log("rows", rows[0]);
    return rows[0];
  },

  // פונקציה לבדוק את הסיסמה המוצפנת בטבלת passwords
  getPasswordByUserId: async (userId,password) => {
    const [rows] = await pool.query('SELECT password_hash FROM passwords WHERE user_id = ? AND password_hash=?', [userId, password]);
    console.log("rows", rows[0]);
    return rows[0]; // מחזיר את הסיסמה המוצפנת (אם קיימת)
  },
};

module.exports = usersService;