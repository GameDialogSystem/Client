import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingOptions: false,
  answerToBeEdited : null,


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
        let lines = dialog.get('lines');
        let linesCount = lines.get("length");

        let input = store.createRecord('input', {
          id : "line" + (linesCount+2) + "input" + 0,
          x: point.x,
          y: point.y,

          output: output,
        });


        let dialogLine = store.createRecord('dialog-line', {
          id : linesCount+2,
          message : `I'm a new dialog line. Change me to something meaningfull :)`,
          x: point.x - 27,
          y: point.y - 20,

          inputs : [
            input
          ]
        });

        input.set('belongsTo', dialogLine);

        dialog.get('lines').pushObject(dialogLine);

      //  dialogLine.save();

        //dialog.save();
        //
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
