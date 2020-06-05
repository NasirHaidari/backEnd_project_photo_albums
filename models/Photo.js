/**
 * Photo Model
 */

module.exports = (bookshelf) => {
    return bookshelf.model('Photo', {
        tableName: 'photos',
        user() {
            return this.belongsTo('User');
        },
        albums() {
            return this.belongsToMany('Album');
        },
    }, {
        fetchPhotoId(id, fetchOptions = {}) {
            return new this({ id }).fetch(fetchOptions);
        },
    });
}


// const Site = bookshelf.model('Site', {
//     tableName: 'sites',
//     photo() {
//       return this.morphOne('Photo', 'imageable')
//     }
//   })

//   const Post = bookshelf.model('Post', {
//     tableName: 'posts',
//     photos() {
//       return this.morphMany('Photo', 'imageable')
//     }
//   })

//   const Photo = bookshelf.model('Photo', {
//     tableName: 'photos',
//     imageable() {
//       return this.morphTo('imageable', 'Site', 'Post')
//     }
//   })