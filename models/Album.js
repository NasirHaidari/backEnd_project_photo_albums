
//Album

module.exports = (bookshelf) => {
    return bookshelf.model('Album', {
        tableName: 'album',
        books() {
            return this.hasMany('foto');
        },
    });
}
