import Ember from 'ember';
import uuidv4 from 'npm:uuid';

let a = Ember.inject.service('store')
export default Ember.Controller.extend({
  errorNameMessage: Ember.computed('hasRecordForId', 'newDialogName', function() {
    console.log(this.newDialogName);
    console.log(this.hasRecordForId);
    if(this.newDialogName === ""){
      return "A name for your dialog is required";
    }

    if(this.hasRecordForId){
      return "There is already a dialog defined with this name"
    }
    // body
  }),

  dialogNameValidations: [{
    message: "There is already a dialog defined with this name",
    validate: (value) => {

      console.log(a.findRecord('model', params.model_id).then);
      return this.store.hasRecordForId('dialog', this.newDialogName);
    },
  }],

  actions: {
    createNewDialog() {
      this.store.createRecord('dialog', {
        id: this.newDialogName,
        name: this.newDialogName,
        description: 'New dialog between character'
      });
    },
  }
});
