const mapAlbumsTableToModel = ({
  id,
  name,
  year,
  cover,
}) => ({
  id,
  name,
  year,
  cover,
});

const mapSongsTableToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

const mapPlaylistTableToModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

module.exports = { mapAlbumsTableToModel, mapSongsTableToModel, mapPlaylistTableToModel };
