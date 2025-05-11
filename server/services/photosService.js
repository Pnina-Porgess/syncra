const pool = require('../../db/db.js');

const photosService = {
  getAllPhotos: async () => pool.query('SELECT * FROM photos'),
  getPhotoById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM photos WHERE id = ?', [id]);
    return rows[0];
  },
  getPhotosByAlbumWithPagination: async (albumId, start, limit) => {
  const [rows] = await pool.query(
    'SELECT * FROM photos WHERE album_id = ? ORDER BY id ASC LIMIT ?, ?',
    [albumId, start, limit]
  );
  return rows;
},
  getPhotosByAlbum: async (albumId) => pool.query('SELECT * FROM photos WHERE album_id = ?', [albumId]),
  createPhoto: async (albumId, url, thumbnailUrl, title) =>
    pool.query(
      'INSERT INTO photos (album_id, url, thumbnailUrl, title) VALUES (?, ?, ?, ?)',
      [albumId, url, thumbnailUrl, title]
    ),
  updatePhoto: async (id, title) => {
  
    const [result] = await pool.query('UPDATE photos SET title = ? WHERE id = ?', [title, id]);
    return result;
  },
  deletePhoto: async (id) => {
    const [result] = await pool.query('DELETE FROM photos WHERE id = ?', [id]);
    return result;
  },
};

module.exports = photosService;