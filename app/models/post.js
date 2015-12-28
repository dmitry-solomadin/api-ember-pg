import DS from 'ember-data';

export default DS.Model.extend({
  header: DS.attr(),
  body: DS.attr(),
  author: DS.belongsTo('user')
});
