import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),
  actions: {
    createPost: function() {
      var post = this.get('model');
      var userId = this.get('session').get('data').authenticated.data.id;
      var controller = this;
      this.get('store').findRecord('user', userId).then(function(user) {
        post.set('author', user);
        return post.save();
      }).then(function(self) {
        controller.transitionToRoute('index');
      }).catch(function(reason) {
        // Do nothing
      });
    }
  }
});
