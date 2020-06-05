/**
 * User Model
 */
const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
    return bookshelf.model('User', {
        tableName: 'users',
        albums() {
            return this.hasMany('Album');
        },
        photos() {
            return this.hasMany('Photo');
        },
    }, {
        hashSaltRounds: 10,
        fetchUserId(id, fetchOptions = {}) {
            return new this({ id }).fetch(fetchOptions);
        },


        login: async function (email, password) {
            try {
                const user = await new this({ email }).fetch({ require: false });
                if (!user) {
                    return false;
                }
                const hash = user.get('password');
                const result = await bcrypt.compare(password, hash);
                return (result) ? user : false;
            } catch (error) {
                console.error(error);
            }
        }
    });
};

