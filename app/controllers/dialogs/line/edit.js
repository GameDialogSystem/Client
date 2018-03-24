import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
  
    save() {
      this.transitionToRoute('dialogs.edit', this.get('model.dialog.id'));
    },

    cancel() {
      this.transitionToRoute('dialogs.edit', this.get('model.dialog.id'));
    }
  }
});
