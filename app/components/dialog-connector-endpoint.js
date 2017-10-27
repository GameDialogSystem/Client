import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gs-answer-circle'],

  mouseMoveListener: null,
  mouseUpListener : null,

  mouseDown: function(e){
    e.stopPropagation();

    var self = this;
    this.set('mouseMoveListener', function(e){
      self.mouseMove(e);
    });

    this.set('mouseUpListener', function(e){
      self.mouseUp(e);
    })

    document.addEventListener('mousemove', this.get('mouseMoveListener'));
    document.addEventListener('mouseup', this.get('mouseUpListener'))
  },

  mouseMove: function(e){
    this.get('connectionReroute')(e.clientX, e.clientY);
    /*
    if(this.get('moveStart')){
      this.set('customLayouted', true);

      let x = this.getScaledCoordinate(e.clientX - this.get('mouseOffsetX'));
      let y = this.getScaledCoordinate(e.clientY - this.get('mouseOffsetY'));

      this.set('positionX', x);
      this.set('positionY', y);

      Ember.$(this.element).css('left', x + 'px');
      Ember.$(this.element).css('top', y + 'px');
    }
    */
  },

  mouseUp: function(){
    document.removeEventListener('mousemove', this.get('mouseMoveListener'));
    document.removeEventListener('mouseup', this.get('mouseUpListener'));
  }
});
8
