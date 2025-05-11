const usersService = require('../services/usersService');

const usersController = {
    getAllUsers: async (req, res) => {
        try {
          console.log("req.query", req.query);
      
          if (req.query.username) {
            // אם יש פרמטר username ב-query
            const user = await usersService.getUserByUsername(req.query.username);
            if(!user) {
                return res.status(200).json();
            }
            return res.status(200).json(user);
           
          } else {
            // אם אין פרמטר username
            const users = await usersService.getAllUsers();
            console.log("users", users);
            return res.status(200).json(users);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch users' });
        }
      },
 getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await usersService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },
      createUser: async (req, res) => {
        console.log("req.body", req.body);
        const { username, name, email, hashedPassword,phone } = req.body;
      
        if (!username || !name || !email || !hashedPassword||!phone) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
      
        try {
          const [result] = await usersService.createUser(username, name, email,phone);
          console.log("רררררר", result);
      
          const userId = result.insertId; // ודא שה-ID נלקח נכון
          console.log("Generated userId:", userId);
      
          await usersService.createPassword(userId, hashedPassword);
          console.log("Password created for userId:", userId);
      
          res.status(201).json({ message: 'User created', id: userId });
        } catch (error) {
          console.error("Error in createUser:", error);
          res.status(500).json({ error: 'Failed to create user' });
        }
      },

  updateUser: async (req, res) => {
    const { username, name, email } = req.body;
    const { id } = req.params;
    if (!username || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      await usersService.updateUser(id, username, name, email);
      res.status(200).json({ message: 'User updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      await usersService.deleteUser(id);
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
    // פונקציה לטיפול ב-LOGIN
  login: async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const user = await usersService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordData = await usersService.getPasswordByUserId(user.id);
    if (!passwordData || passwordData.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Failed to login' });
  }
},

};

module.exports = usersController;