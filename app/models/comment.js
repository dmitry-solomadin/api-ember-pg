import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  author: DS.belongsTo('user'),
  // TODO: not sure if flatten polymorphic relationship is the best way to deal with them in ember.
  // Need to check if there is a better way.
  comment: DS.belongsTo('comment'),
  post: DS.belongsTo('post')
});
