import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
  tagName: 'path',

  attributeBindings: ['d', 'fill', 'stroke', 'stroke-width'],
  start : null,
  end : null,

  d: computed("startX", "startY", "endX", "endY", () => {

//-answersCount*30+10+index*30
    let startX = this.get('start').x;
    let startY = this.get('start').y;

    let endX = this.get('end').x;
    let endY = this.get('end').y;

    let cX = startX;
    let cY = endY; //startY + (endY - startY) / 2;

    let dX = endX;
    let dY = startY; //endY - (endY - startY) / 2;

    console.log(`sx:${startX} sy:${startY} ex:${endX} ey:${endY}`);


    if(isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY))
      return `M0,0 C0,0 0,0 0,0`;

    return `M${startX},${startY} C${cX},${cY} ${dX},${dY} ${endX},${endY}`;
  }),

  fill: 'none',

  stroke: '#78909C',

  'stroke-width': '4',

  classNames : ['path']
});
