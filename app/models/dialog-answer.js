import DS from 'ember-data';
import FlowOutputModel from 'flow-logic/models/output';

export default FlowOutputModel.extend({
  nextDialogLine: DS.belongsTo('dialog-line', {inverse: 'askedBy'}),
  requirement: DS.attr('string', {default: "Might"}),
  requirementValue: DS.attr('number'),
  response: DS.attr('string'),
});
