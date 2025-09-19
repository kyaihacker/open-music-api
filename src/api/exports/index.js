const ExportsHandler = require('./handler');
const routes = require('./routes');
const PlaylistsService = require('../../services/postgres/PlaylistsService');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const exportsHandler = new ExportsHandler(
      service,
      server.app.playlistsService || new PlaylistsService(),
      validator,
    );
    server.route(routes(exportsHandler));
  },
};
