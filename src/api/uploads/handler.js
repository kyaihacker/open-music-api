/* eslint-disable no-underscore-dangle */
class UploadsHandler {
  constructor(service, albumsService, validator) {
    this._service = service;
    this._albumsService = albumsService;
    this._validator = validator;

    this.postAlbumCoverHandler = this.postAlbumCoverHandler.bind(this);
  }

  async postAlbumCoverHandler(request, h) {
    const { id: albumId } = request.params;
    const { cover } = request.payload;

    if (!cover || !cover.hapi) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal mengunggah sampul. Tidak ada file yang ditemukan',
      });
      response.code(400);
      return response;
    }

    const contentType = cover.hapi.headers['content-type'];
    const allowedTypes = ['image/apng', 'image/avif', 'image/jpeg', 'image/gif', 'image/webp'];
    if (!contentType || !allowedTypes.includes(contentType)) {
      const response = h.response({
        status: 'fail',
        message: 'Format berkas tidak didukung',
      });
      response.code(400);
      return response;
    }

    // eslint-disable-next-line radix
    const contentLength = parseInt(cover.hapi.headers['content-length'] || '0');
    if (contentLength > 512000) {
      const response = h.response({
        status: 'fail',
        message: 'Ukuran berkas terlalu besar',
      });
      response.code(413);
      return response;
    }

    const filename = await this._service.writeFile(cover, cover.hapi);

    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/uploads/images/${filename}`;

    await this._albumsService.addAlbumCover(albumId, coverUrl);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      data: {
        coverUrl,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
