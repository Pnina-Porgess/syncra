const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const todosRoutes = require('./routes/todos');
const commentsRoutes = require('./routes/comments');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/todos', todosRoutes);
app.use('/comments', commentsRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
