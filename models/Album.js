/**
 * Album Model
 */


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


module.exports = (bookshelf) => {
    return bookshelf.model('Albums_Photos', {
        tableName: 'albums_photos',
    });
}

// exports.up = function(knex) {
//     return knex.schema.createTable('books', function(table) {
//       table.increments('id').primary()
//       table.string('name')
//     }).createTable('authors', function(table) {
//       table.increments('id').primary()
//       table.string('name')
//     }).createTable('authors_books', function(table) {
//       table.integer('author_id').unsigned().references('authors.id')
//       table.integer('book_id').unsigned().references('books.id')
//     })
//   }

//   exports.down = function(knex) {
//     return knex.schema.dropTable('authors_books')
//       .dropTable('authors')
//       .dropTable('books')
//   }