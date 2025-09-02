/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
// export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // membuat album baru
  pgm.sql("INSERT INTO albums(id, name, year) VALUES ('old_album', 'old_album', '2000')");

  // mengubah nilai album_id pada song yang album_id-nya bernilai NULL
  pgm.sql("UPDATE songs SET album_id = 'old_album' WHERE album_id IS NULL");

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint('songs', 'fk_songs.album_id_albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint('songs', 'fk_songs.album_id_albums.id');

  // mengubah nilai owner old_notes pada note menjadi NULL
  pgm.sql("UPDATE songs SET album_id = NULL WHERE album_id = 'old_album'");

  // menghapus user baru.
  pgm.sql("DELETE FROM albums WHERE id = 'old_album'");
};
