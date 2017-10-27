import Ember from 'ember';

export function dialogLineConnectorPosition([model, index, type]) {
  index -= 1;

  let answersCount = model.get('answers').get('length');

  if(type === 'start'){
    let startX = (model.get('positionX')+model.get('width')-answersCount*30)-index*30+10;
    let startY = model.get('positionY')+model.get('height')-64-16;

    return `M${startX},${startY}`;
  }else if(type === 'end'){
    let endX = model.get('positionX')+20;
    let endY = model.get('positionY')-64+16;

    return {x: endX, y: endY}
  }

  return {x: 0, y: 0};
}

export default Ember.Helper.helper(dialogLineConnectorPosition);
