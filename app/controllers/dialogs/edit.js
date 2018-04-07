import Ember from 'ember';
import uuidv4 from 'npm:uuid';

export default Ember.Controller.extend({
  isShowingOptions: false,
  answerToBeEdited : null,

  showToast: false,

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

        const input = store.createRecord('input', {
          id : uuidv4(),

          x: point.x,
          y: point.y
        });


        const connection = store.createRecord('connection', {
          id: uuidv4(),

          input: input,
          output: output
        });

        input.set("connection", connection);
        output.set("connection", connection);

        const dialogLine = store.createRecord('dialog-line', {
          id : uuidv4(),
          message : `Random Text ${Math.floor((Math.random() * 100) + 1)}`,
          x: point.x - 27,
          y: point.y - 20,

          inputs : [
            input
          ]
        });






        // add the blank output to allow the connection of grandchildren
        //dialogLine.get("outputs").pushObject(newOutput);
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

    deleteBlock(block){
      if(block.get('inputs.length') === 0){
        this.set('toastMessage', 'Deletion cancelled: Cannot delete first dialog line');
        this.set("showToastButton", false);
        this.set('showToast', true);

        return;
      }


      let hasChildren = false;
      block.get('outputs').forEach((output) => {
        if(output.get('isConnected')){
          hasChildren = true;
        }
      })

      if(hasChildren){
        this.set('toastMessage', 'Deletion cancelled: Message line has children');
        this.set("showToastButton", false);
        this.set('showToast', true);

        return;
      }

      block.get('inputs').forEach(function(input){
        input.get("connection").then((connection) => {
            connection.get('output').then((output) => {
              output.destroyRecord();
            })

          connection.destroyRecord();
        })

        input.destroyRecord();
      })

      block.get('outputs').forEach(function(output){
        output.destroyRecord();
      })
      block.destroyRecord();

      this.set('toastMessage', 'Deleted Message Line');
      this.set("showToastButton", true);
      this.set('showToast', true);
    },

    cancelReroute(){

    },


    updateDialogLine(dialogLine){
      this.get('store').findRecord('dialog-line', dialogLine.get('id')).then(function(line) {
        // ...after the record has loaded
        line.save();
      });
    },

    editDialogLine(id) {
      //this.set('showLineEditDialog', true);
      this.get('store').findRecord('dialog-line', id)
      .then((line) => {
        this.set('dialogLine', line);
        this.set('showLineEditDialog', true);
      })
    },

    connectionReroute: function(){
    }
  }
});
