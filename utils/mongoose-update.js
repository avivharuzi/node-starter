module.exports = function (schema) {
  const update = function (next) {
    if (this._update) {
      this._update.updatedAt = new Date();
    }
    next();
  };

  schema.pre('save', update)
    .pre('update', update)
    .pre('findOneAndUpdate', update)
    .pre('findByIdAndUpdate', update);
};
