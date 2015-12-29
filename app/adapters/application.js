import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'api-ember-pg/adapters/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: 'http://localhost:3000',
  handleResponse: function(status, headers, payload) {
    if (this.isSuccess(status, headers, payload)) {
      return payload;
    } else if (this.isInvalid(status, headers, payload)) {
      return new DS.InvalidError(payload.errors);
    }

    let errors = this.normalizeErrorResponse(status, headers, payload);

    return new DS.AdapterError(errors);
  },
  authorizer: 'authorizer:token-session'
});
