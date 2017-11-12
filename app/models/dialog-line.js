import DS from 'ember-data';
import FlowBlockModel from 'flow-logic/models/block';

import AutoSaveMixin from '../mixins/auto-save'

export default FlowBlockModel.extend(AutoSaveMixin, {
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
  * defines the related answers to a dialog line.
  */
  //answers: DS.hasMany('dialog-answer', {inverse: 'belongsTo'})
});
