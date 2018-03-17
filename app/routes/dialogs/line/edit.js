import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
      const store = this.get('store');
      const line = store.findRecord('dialog-line', params.line_id);

      return line;
  }
});
