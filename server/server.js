const express = require('express');
const cors = require('cors');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');
const todosRoutes = require('./routes/todos');
const albumsRoutes = require('./routes/albums');
const photosRoutes = require('./routes/photos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);
app.use('/albums', albumsRoutes);
app.use('/photos', photosRoutes);

const PORT = 3000;
app.listen(PORT, () => {});