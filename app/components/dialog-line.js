import Ember from 'ember';
import FlowElement from 'flow-logic/components/flow-element';

export default FlowElement.extend({
  // inject the store to create the blank outputs to allow
  // user the creation of new connections from an existing
  // dialog line
  store: Ember.inject.service(),

  isExtended: true,
  displayedRows: 3,

  _height: 0,

  autoresizeEnabled : true,

  addEmptyOutput: function(){
    let outputs = this.get("model.outputs");

    // create an empty output connector to allow the creation of new connections
    let output = this.get("store").createRecord('output', {
      id: `line${this.get("model.id")}output${outputs.get("length")}`
    });

    // add the empty output connector to the dialog line
    this.get("model.outputs").pushObject(output);
  },

  didInsertElement(){
    this._super(...arguments);

    this.addEmptyOutput();
  },

  actions: {

    /**
     * Is triggered each time an output pin was rerouted, not connected to an
     * existing input pin and the action wasn't cancelled. Use this function
     * to add new blocks to the model.
     *
     * @param {Output} output - the outgoing pin where the action was initialized
     * @param {Point} point - the position where the mouse button was released and
     * the new block should be inserted
     */
    connectToNewBlock: function(output, point){
      let connectToNewBlock = this.get('connectToNewBlock');
      if(connectToNewBlock !== null || connectToNewBlock !== undefined){
        connectToNewBlock(output, point);
        this.addEmptyOutput();
      }
    },
  },


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
