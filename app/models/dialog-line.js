import DS from 'ember-data';
import FlowBlockModel from 'flow-logic/models/block';

export default FlowBlockModel.extend({

  /**
  * Reference to the containing dialog
  */
  dialog: DS.belongsTo('dialog', {inverse: 'lines'}),

  /**
  * each dialog line is followed by a dialog answer. The only exception is
  * the starting line of a dialog. In this case this relationship will be null
  */
  //askedBy: DS.belongsTo('dialog-answer'),

  /**
  * the message that will be displayed in the game
  */
  message: DS.attr('string'),

  /**
   * indicates if a dialog line was already presented to the user.
   */
  alreadySaid: DS.attr('boolean'),

  /**
  * defines the related answers to a dialog line.
  */
  //answers: DS.hasMany('dialog-answer', {inverse: 'belongsTo'})
  //


   /**
    * defines the relationship to the precessor. All dialog lines except the
    * starting one must have an precessor. To check if a dialog line is the
    * starting point of a connection, check if this attribute is null.
    */
   previousLine: DS.belongsTo('dialog-line', { inverse: 'nextLines' }),
});
