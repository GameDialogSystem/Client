import Ember from 'ember';

export default Ember.Controller.extend({
  dialogEditController: Ember.inject.controller('dialogs.edit'),

  showLoadingDialog: false,

  host: '',

  init() {
    this._super(...arguments);

    this.set('host', this.get('store').adapterFor('application').get('host'))
  },

  actions: {
    undo(){
      alert("undo");
    },

    redo(){
      alert("redo");
    },

    relayout(){
      const parentLine = this.get("dialogEditController.model.startingLine");

      parentLine.set("relayoutTimestamp", Date.now());
    },

    loadDialogFile(){
      this.set('showLoadingDialog', true);
    },

    closeDialog(){
      this.set('showLoadingDialog', false);
    },

    onFileSelect(file) {
      this.transitionToRoute('dialogs.edit', file.fileName + "." + file.extension);

    }
  }
});
