import DS from 'ember-data';

export default DS.Model.extend({
  header: DS.attr(),
  body: DS.attr(),
  comments: DS.hasMany('comment'),
  author: DS.belongsTo('user')
});
