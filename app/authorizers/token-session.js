import Ember from 'ember';
import Token from 'ember-simple-auth-token/authenticators/token';

export default Token.extend({
  session: Ember.inject.service('session'),
  authorize(data = {}, block = () => {}) {
    const token = data['token'];
    const client = data['client'];

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      block([
        { name: 'access-token', value: token },
        { name: 'token-type', value: 'Bearer' },
        { name: 'client', value: client },
        { name: 'uid', value: 'user@gmail.com' }
      ]);
    }
  }
});
