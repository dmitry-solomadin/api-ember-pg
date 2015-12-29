import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      post: this.store.findRecord('post', params.post_id),
      newComment: this.store.createRecord('comment', {
        text: ''
      })
    }
  }
});
