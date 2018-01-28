import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gs-answer-circle'],

  mouseMoveListener: null,
  mouseUpListener : null,
/*
  mouseDown: function(e){
    e.stopPropagation();

    var self = this;
    this.set('mouseMoveListener', function(e){
      self.mouseMove(e);
    });

    this.set('mouseUpListener', function(e){
      self.mouseUp(e);
    })

console.log("F");
    document.addEventListener('mousemove', this.get('mouseMoveListener'));
    document.addEventListener('mouseup', this.get('mouseUpListener'))
  },

  mouseMove: function(e){
    console.log("F");
    this.get('connectionReroute')(e.clientX, e.clientY);
  },

  mouseUp: function(){
    document.removeEventListener('mousemove', this.get('mouseMoveListener'));
    document.removeEventListener('mouseup', this.get('mouseUpListener'));
  }
  */
});
