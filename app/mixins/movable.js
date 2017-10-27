import Ember from 'ember';

export default Ember.Mixin.create({
  moveStart : false,

  mouseOffsetX: 0,
  mouseOffsetY: 0,

  positionX: 0,
  positionY: 0,

  mouseMoveListener: null,
  mouseUpListener : null,

  gridSize : 25,


    mouseDown: function(e){
      this.set('moveStart', true);

      this.set('mouseOffsetX', e.clientX-Ember.$(this.element).offset().left);
      this.set('mouseOffsetY', e.clientY-Ember.$(this.element).offset().top);

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

    getScaledCoordinate(coordinate){
      return (Math.floor(coordinate / this.get('gridSize')) * this.get('gridSize'));
    },

    mouseMove: function(e){
      if(this.get('moveStart')){
        this.set('customLayouted', true);

        let x = this.getScaledCoordinate(e.clientX - this.get('mouseOffsetX'));
        let y = this.getScaledCoordinate(e.clientY - this.get('mouseOffsetY'));

        this.set('positionX', x);
        this.set('positionY', y);

        Ember.$(this.element).css('left', x + 'px');
        Ember.$(this.element).css('top', y + 'px');
      }
    },

    mouseUp: function(){
      if(this.get('moveStart')){
        this.set('moveStart', false);
        document.removeEventListener('mousemove', this.get('mouseMoveListener'));
        document.removeEventListener('mouseup', this.get('mouseUpListener'));
      }
    }
});
