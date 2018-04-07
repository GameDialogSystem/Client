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
    undo() {
      alert("undo");
    },

    redo() {
      alert("redo");
    },

    relayout() {
      const parentLine = this.get("dialogEditController.model.startingLine");

      parentLine.set("relayoutTimestamp", Date.now());
    },

    loadDialogFile() {
      this.set('showLoadingDialog', true);
    },

    saveDialogFile() {
      const model = this.get('dialogEditController.model');


      model.get('lines').forEach(line => {
        line.save().then(() => {
          line.get('outputs').forEach(output => {
            if (output.get('isConnected')) {
              output.save().then(() => {
                output.get('connection').save();
              })
            }
          });

          line.get('inputs').forEach(input => {
            input.save();
          })
        });
      });
    },

    closeDialog() {
      this.set('showLoadingDialog', false);
    },

    onFileSelect(file) {
      this.transitionToRoute('dialogs.edit', file.fileName + "." + file.extension);

    }
  }
});
