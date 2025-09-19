const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.postAlbumCoverHandler,
    options: {
      payload: {
        parse: true,
        multipart: true,
        output: 'stream',
        maxBytes: 512000, // 500 KB
      },
    },
  },
  {
    method: 'GET',
    path: '/uploads/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../../uploads/images'),
        redirectToSlash: true,
        index: false,
      },
    },
  },
];

module.exports = routes;
