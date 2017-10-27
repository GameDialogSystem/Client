import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNewDialog(){
      this.set("showPromptDialog", true);
    },

    modifyDialog(dialog){
        this.transitionToRoute('dialogs', dialog)
    },

    closePromptDialog(){
      // hide dialog
      this.set("showPromptDialog", false);


      let store = this.get('store');

      // create new dialog
      let line = store.createRecord('dialog-line', {
        message: 'Cute Game',
      });

      this.get('store').push({
        data: [{
          id: 0,
          type: 'dialog-line',
          attributes: {
            name: "Here is a cool dialog :)",
          },
        }]
      });

      this.get('store').push({
        data: [{
          id: 1,
          type: 'dialog',
          attributes: {
            name: arguments[1],
          },

          startingLine: 0
        }]
      });

      // reroute to display dialog edit view
      this.transitionToRoute('dialogs', 1);
    },

    showContact(){
      this.transitionToRoute("contact");
    },

    showAbout(){
      console.log("showAbout")
      this.transitionToRoute("about");
    }
  }
});
