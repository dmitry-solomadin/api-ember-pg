import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:token-session';
      this.set('errorMessage', null);

      this.get('session').authenticate(authenticator, credentials).catch((reason) => {
        this.set('errorMessage', reason.errors);
      }).then(function(value) {
        console.log(value);
      });
    }
  }
});
