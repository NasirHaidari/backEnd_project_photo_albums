


module.exports = (bookshelf) => {
    return bookshelf.model('Foto', {
        tableName: 'foto',
        author() {
            return this.belongsTo('user');
        },
        users() {
            return this.belongsToMany('User');
        }
    }, {
        fetchById(id, fetchOptions = {}) {
            return new this({ id }).fetch(fetchOptions);
        },
    });
}