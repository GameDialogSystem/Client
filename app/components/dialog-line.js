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
      id: `line${this.get("model.id")}output${outputs.get("length")}`,
      belongsTo: this.get("model"),
    });

    // add the empty output connector to the dialog line
    this.get("model.outputs").pushObject(output);
  },

  /**
   * isLoaded - Observer that listens for the model state. In case that
   * the model has the state "root.loaded.saved" the model was fully loaded
   * and the width and height can be set by the DOM element geometry.
   */
  isLoaded: Ember.observer("model.currentState.stateName", function(){
    if(this.get("model.currentState.stateName") === "root.loaded.saved"){
      this.addEmptyOutput();

      const element = Ember.$(this.element);
      this.set("model.width", element.width());
      this.set("model.height", element.height());
    }
  }),


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

    elementEdit: function(){
      this.get('onElementEdit')();      
    }
  }
});
