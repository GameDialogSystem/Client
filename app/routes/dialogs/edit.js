import Ember from 'ember';
import TimeMachine from 'ember-time-machine';

export default Ember.Route.extend({

    model(params) {
        const store = this.get('store');
        const dialog = store.findRecord('dialog', params.dialog_id)



      // transform the object to a time machine object to have an undo/redo
      // stack
      const dialogWithHistory = TimeMachine.Object.create({
        content: dialog
      });

      return dialogWithHistory;
    },
});
