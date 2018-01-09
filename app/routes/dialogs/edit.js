import Ember from 'ember';
import TimeMachine from 'ember-time-machine';

export default Ember.Route.extend({

    model(params) {
      const dialog = this.get('store').findRecord('dialog', params.dialog_id, {include: 'lines'});

      //const ignoredProperties = ["lines.@each.outputs.@each.y"]

      const dialogWithHistory = TimeMachine.Object.create({
        content: dialog//,
        //ignoredProperties
      });

      return dialogWithHistory;
    },
});
