

//DB connection
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || 'mysql',
		database: process.env.DB_NAME || 'pictures',
	}
});

const bookshelf = require('bookshelf')(knex);
const Album = require('./Album')(bookshelf);
const Photo = require('./Photo')(bookshelf);
const User = require('./User')(bookshelf);
const Albums_Photos = require('./Albums_Photos')(bookshelf);


module.exports = {
	bookshelf,
	Album,
	Albums_Photos,
	Photo,
	User,
}