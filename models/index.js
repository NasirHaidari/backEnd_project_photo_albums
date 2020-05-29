

//DB connection
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'photos',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'photos',
    }
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.Album = require('./Album')(bookshelf);
models.Foto = require('./Foto')(bookshelf);
models.User = require('./User')(bookshelf);

module.exports = {
    bookshelf,
    ...models,
};
