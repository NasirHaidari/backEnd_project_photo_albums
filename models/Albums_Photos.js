///Albums-photo

module.exports = (bookshelf) => {
  return bookshelf.model(
    'Album_Photos',
    {
      tableName: 'albums_photos',
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
