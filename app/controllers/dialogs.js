import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    undo(){
      alert("undo");
    },

    redo(){
      alert("redo");
    },
  }
});
