import DS from 'ember-data';
import { computed } from '@ember/object';
import FlowBlockModel from 'flow-logic/models/block';

export default FlowBlockModel.extend({
  askedBy: DS.belongsTo('dialog-answer'),

  message: DS.attr('string'),
  answers: DS.hasMany('dialog-answer', {inverse: 'belongsTo'}),

  position : DS.attr('point'),

  size : DS.attr('size'),
  /*
  positionX : DS.attr('number'),
  positionY : DS.attr('number'),

  width : DS.attr('number'),
  height : DS.attr('number'),
*/
  connectionPosition : computed('positionX', 'positionY', function(){
    return {
      x: this.get('positionX'),
      y: this.get('positionY')
    };
  })
});
