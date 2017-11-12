import Ember from 'ember';
import DS from 'ember-data';
import FlowOutputModel from 'flow-logic/models/output';

export default FlowOutputModel.extend({
  /**
  * Defines the relationship to the next dialog line. In case there is no next
  * dialog line defined, this will be null.
  */
  //nextDialogLine: DS.belongsTo('dialog-line', {inverse: 'askedBy'}),

  belongsTo: DS.belongsTo('dialog-line'),

  /**
  * Defines the requirement that must be fullfilled in order to give this answer.
  */
  requirement: DS.attr('string', {default: "Might"}),

  /**
  * Defines the value of the requirement that must be fullfilled.
  */
  requirementValue: DS.attr('number'),

  /**
  * Defines the answer that will be shown to the user within the game.
  */
  response: DS.attr('string'),


  responseChanged: Ember.observer('response', function(){
    // only save model if response was really changed and not set
    // initially on load
    if(this.get('_response') !== undefined){
      this.save();
    }
  })
});
