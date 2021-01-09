////Albums

module.exports = (bookshelf) => {
  return bookshelf.model(
    'Album',
    {
      tableName: 'albums',
      photos() {
        return this.belongsToMany('Photo')
      },
      users() {
        return this.belongsTo('User')
      },
    },
    {
      fetchById(id, fetchOptions = {}) {
        return new this({ id }).fetch(fetchOptions)
      },
    }
  )
}
