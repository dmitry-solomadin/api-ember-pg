import Token from 'ember-simple-auth-token/authenticators/token';
import Ember from 'ember';

export default Token.extend({
  authenticate(credentials, headers) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const data = this.getAuthenticateData(credentials);

      this.makeRequest(data, headers).then((response, textStatus, request) => {
        Ember.run(() => {
          response['token'] = request.getResponseHeader('access-token');
          response['client'] = request.getResponseHeader('client');
          resolve(this.getResponseData(response));
        });
      }, xhr => {
        Ember.run(() => { reject(xhr.responseJSON || xhr.responseText); });
      });
    });
  },
});
