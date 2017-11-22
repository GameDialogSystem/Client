import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingOptions: false,
  answerToBeEdited : null,

  uuid4v: function()
  {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  },

  actions : {
    rerouteToIndex(){
      this.transitionToRoute('index');
    },

    /**
     * Adds a new block to the model.
     *
     * @param {Output} output - the outgoing pin where the action was initialized
     * @param {Point} point - the position where the mouse button was released and
     * the new block should be inserted
     */
    createNewDialogLine(output, point){
        let store = this.get('store');
        let dialog = this.get('model');

        let input = store.createRecord('input', {
          id : this.uuid4v(),
          x: point.x,
          y: point.y,

          output: output
        });


        let dialogLine = store.createRecord('dialog-line', {
          id : this.uuid4v(),
          message : `I'm a new dialog line. Change me to something meaningfull :)`,
          x: point.x - 27,
          y: point.y - 20,


          inputs : [
            input
          ]
        });

        input.set('belongsTo', dialogLine);

        dialog.get('lines').pushObject(dialogLine);

        dialogLine.save();

        //dialog.save();
    },

    deleteBlock(block){
      block.get('inputs').forEach(function(input){
        input.destroyRecord();
      })
      block.destroyRecord();
    },

    cancelReroute(){

    },


    updateDialogLine(dialogLine){
      this.get('store').findRecord('dialog-line', dialogLine.get('id')).then(function(line) {
        // ...after the record has loaded
        line.save();
      });
    },

    connectionReroute: function(){
    }
  }
});
