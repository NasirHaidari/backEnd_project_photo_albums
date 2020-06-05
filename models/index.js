// Setting up the database connection
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

const { Album, Albums_Photos } = require('./Album')(bookshelf);
const Photo = require('./Photo')(bookshelf);
const User = require('./User')(bookshelf);


module.exports = {
	bookshelf,
	Album,
	Albums_Photos,
	Photo,
	User,
}