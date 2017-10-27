import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingOptions: false,
  answerToBeEdited : null,

  actions : {
    rerouteToIndex(){
      this.transitionToRoute('index');
    },

    addNewElement(){

    },

    reroute(){

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
        console.log(dialogLine.get('message'));
        line.save();
      });
    },

    connectionReroute: function(x, y){
      console.log('reroute connection '+x+', '+y);
    }
  }
});
