import Ember from 'ember';
import MovableMixin from '../mixins/movable';
import FlowElement from 'flow-logic/components/flow-element';

export default FlowElement.extend({
  //tagName: 'gs-item-movable',

/*
  customLayouted: false,




  actions: {
    addAnswer(){
      this.get('onAddAnswer')(this.get('model'));
    },

    changeAnswer(model){
      this.get('onChangeAnswer')(model);
    },

    deleteAnswer(model){
      this.get('onDeleteAnswer')(model);
    },

    update(){
      this.get('onChange')(this.get('model'));
    },

    onConnectionReroute : function(x, y){
      this.get('onConnectionChange')(x, y);
    }
  },

  positionChanged: Ember.observer('positionX', 'positionY', function(){
    console.log(this.get('model').get('position'));

    this.get('model').set('position', {
      x: this.get('positionX'),
      y: this.get('positionY')
    });

  }),


  didUpdate: function(){
    // only update model if app was loaded successfully
    if(this.get('model').content.currentState.stateName != "root.loading"){
      if(!this.get('customLayouted')){

        let width = Ember.$(this.element).width();
        let height = Ember.$(this.element).height();

        this.get('model').set('size', {
          'width': width,
          'height': height
        });

        let parentWidth = Ember.$(this.element).parent().width();
        let parentHeight = Ember.$(this.element).parent().height();

        let positionX = parentWidth * (this.get('x') / 100) - width / 2;
        let positionY = parentHeight * (this.get('y') / 100);

      }
    }
  }
  */
});
