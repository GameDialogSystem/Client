import Ember from 'ember';

export default Ember.Route.extend({

    model(params) {
      console.log("GET DIALOG");

      return this.get('store').findRecord('dialog', params.dialog_id, {include: 'lines'});
    }
});
