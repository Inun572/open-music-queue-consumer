const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const playlistQuery = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const songQuery = {
      text: `SELECT s.id, s.title, s.performer
      FROM playlists_songs ps
      RIGHT JOIN songs s ON ps.song_id = s.id
      WHERE ps.playlist_id = $1;`,
      values: [playlistId],
    };

    const playlist = await this._pool.query(playlistQuery);
    const songs = await this._pool.query(songQuery);

    return {
      playlist: playlist.rows[0],
      songs: songs.rows,
    };
  }
}

module.exports = PlaylistsService;
