import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    createComment(post, comment) {
      var userId = this.get('session').get('data').authenticated.data.id;
      this.store.findRecord('user', userId).then(function(user) {
        comment.set('author', user);
        comment.set('post', post);
        return comment.save();
      }).then(function(self) {
        // Do nothing.
      }).catch(function(reason) {
        // Do nothing
      });
    }
  }
});
