

////Albums

module.exports = (bookshelf) => {
    return bookshelf.model('Album', {
        tableName: 'albums',
        user() {
            return this.belongsTo('User');
        },
        photos() {
            return this.belongsToMany('Photo');
        },
    }, {
        fetchAlbumId(id, fetchOptions = {}) {
            return new this({ id }).fetch(fetchOptions);
        },
    });
}

