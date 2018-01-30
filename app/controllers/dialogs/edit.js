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
    createNewDialogLine: function(output, point){
        const store = this.get('store');
        const dialog = this.get('model');
        const lines = dialog.get('lines');
        const linesCount = lines.get("length");

        const input = store.createRecord('input', {
          id : "line" + (linesCount+2) + "input" + 0,
          x: point.x,
          y: point.y
        });

        const connection = store.createRecord('connection', {
          input: input,
          output: output
        });

        input.set("connection", connection);
        output.set("connection", connection);

        const dialogLine = store.createRecord('dialog-line', {
          id : linesCount+2,
          message : `I'm a new dialog line. Change me to something meaningfull :)`,
          x: point.x - 27,
          y: point.y - 20,

          inputs : [
            input
          ]
        });

        // create an empty output connector to allow the creation of new connections
        let newOutput = this.get("store").createRecord('output', {
          id: `line${this.get("model.id")}output${Math.floor((Math.random() * 1000) + 1)}`,
          belongsTo: dialogLine,
        });

        // add the blank output to allow the connection of grandchildren
        dialogLine.get("outputs").pushObject(newOutput);
        input.set('belongsTo', dialogLine);

        dialog.get('lines').pushObject(dialogLine);


        const self = this;
        setTimeout(function(){
          self.send("automaticallyRelocateLines", dialog.get("startingLine"));
        }, 100)

    },


    /**
     * automaticallyRelocateLines - Automatically lines within a perfect
     * layout.
     *
     * Be aware that this function will be moved to the flow logic addon
     * soon.
     *
     * @return {type}  description
     */
    automaticallyRelocateLines: function(parentLine){
      parentLine.set("relayoutTimestamp", Date.now());
    },

    undoChange: function(){
      this.get("model").undo();
    },

    redoChange: function(){
      this.get("model").redo();
    },

    saveDialog: function(){
      this.get("model").save();
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
