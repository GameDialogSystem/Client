import Ember from 'ember';

export default Ember.Controller.extend({
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

    loadDialogFile(){
      this.set('showLoadingDialog', true);
    },

    closeDialog(){
      this.set('showLoadingDialog', false);
    }
  }
});
