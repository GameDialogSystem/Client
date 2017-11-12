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


        let dialogLine = store.createRecord('dialog-line', {
          message : `I'm a new dialog line. Change me to something meaningfull :)`,
          x: point.x - 27,
          y: point.y - 20
        });
        dialogLine.set('id', Ember.guidFor(dialogLine));

      //  let input = store.createRecord('input', {
      //    output : output
      //  })
      //  input.set('id', Ember.guidFor(input));
        //dialogLine.get('inputs').pushObject(input);

        dialog.get('lines').pushObject(dialogLine);

        dialogLine.save().then(function(line){
          let input = line.get('inputs.firstObject');
          input.set('output', output);
        })
    },

    deleteBlock(block){
      block.get('inputs').forEach(function(input){
        input.destroyRecord();
      })
      block.destroyRecord();
    },

    cancelReroute(){

    },

    addAnswer(dialogLine){
      let store = this.get('store');
      let answer = store.createRecord('dialog-answer', {
        id: Date.now(),
        response: 'Rails is Omakase',
        requirement: 'Might',
        requirementValue: '6'
      });

      dialogLine.get('answers').pushObject(answer);

      answer.save();
    },

    showOptionsForAnswer(dialogAnswer){
      this.toggleProperty('isShowingOptions');
      this.set('answerToBeEdited', dialogAnswer);
    },

    changeAnswer(dialogAnswer){
      this.get('store').findRecord('dialog-answer', dialogAnswer.get('id')).then(function(answer) {
        answer.save();
      });
    },

    deleteAnswer(dialogAnswer){
      dialogAnswer.destroyRecord();
    },

    closeChangeAnswer(){
      this.toggleProperty('isShowingOptions');
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
