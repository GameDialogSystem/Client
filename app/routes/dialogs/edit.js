import Ember from 'ember';
import TimeMachine from 'ember-time-machine';

export default Ember.Route.extend({

    model(params) {
        const store = this.get('store');
        const dialog = store.findRecord('dialog', params.dialog_id);

        const dialogWithHistory = TimeMachine.Object.create({
          content: dialog
        });

        return dialog;
    },


    actions: {
      loading(transition, originRoute) {
        let controller = this.controllerFor('dialogs.edit');
        controller.set('currentlyLoading', true);
        console.log("LOADING");

        return true; // allows the loading template to be shown
      }
    }
});
