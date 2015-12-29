import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Mixin.create({

  session: service('session'),

  authorizer: null,

  ajaxOptions() {
    const authorizer = this.get('authorizer');
    Ember.assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", Ember.isPresent(authorizer));

    let hash = this._super(...arguments);
    let { beforeSend } = hash;

    hash.beforeSend = (xhr) => {
      this.get('session').authorize(authorizer, (headers) => {
        for (let header of headers) {
          xhr.setRequestHeader(header.name, header.value);
        }
      });
      if (beforeSend) {
        beforeSend(xhr);
      }
    };
    return hash;
  },

  handleResponse(status) {
    if (status === 401) {
      if (this.get('session.isAuthenticated')) {
        this.get('session').invalidate();
      }
      return true;
    } else {
      return this._super(...arguments);
    }
  }
});
