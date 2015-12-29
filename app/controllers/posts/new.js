import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    createPost: function() {
      var post = this.get('model');
      var userId = this.get('session').get('data').authenticated.data.id;
      var contoller = this;
      this.store.findRecord('user', userId).then(function(user) {
        post.set('author', user);
        return post.save();
      }).then(function(self) {
        contoller.transitionToRoute('index');
      }).catch(function(reason) {
        debugger
      });
    }
  }
});
