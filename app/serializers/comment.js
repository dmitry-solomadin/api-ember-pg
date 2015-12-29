import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options) {
    var json = this._super(...arguments);

    if (json.data.relationships.comment.data) {
      json.data.relationships.parent = {
        data: {
          id: json.data.relationships.comment.data.id,
          type: 'comments'
        }
      };
      delete json.data.relationships.comment;
    } else if (json.data.relationships.post.data) {
      json.data.relationships.parent = {
        data: {
          id: json.data.relationships.post.data.id,
          type: 'posts'
        }
      };
      delete json.data.relationships.post;
    }
    debugger;

    return json;
  }
});
