import FlowElement from 'flow-logic/components/flow-element';
import Ember from 'ember';



export default FlowElement.extend({
  // inject the store to create the blank outputs to allow
  // user the creation of new connections from an existing
  // dialog line
  store: Ember.inject.service(),

  isExtended: true,
  displayedRows: 3,

  _height: 0,

  autoresizeEnabled : true,



  emptyOutput: null,


  didInsertElement() {
    this._super(...arguments);

    this.addEmptyOutput();
  },

  addEmptyOutput: function(){
    let outputs = this.get("model.outputs");

    // create an empty output connector to allow the creation of new connections
    let output = this.get("store").createRecord('output', {
      id: "o"+outputs.get('length')+"__"+(Math.floor(Math.random() * 10000) + 1),
      belongsTo: this.get("model"),
    });

    // add the empty output connector to the dialog line
    this.get("model.outputs").pushObject(output);
  },


  connectedOutputs: Ember.computed('model.outputs.@each.isConnected', function() {
    const outputs = this.get('model.outputs');
    return outputs.filterBy('isConnected', true);
  }),


  unconnectedOutput: Ember.computed('model.outputs.@each.isConnected', function() {
    const outputs = this.get('model.outputs');
    return outputs.filterBy('isConnected', false);
  }),



  /**
   * isLoaded - Observer that listens for the model state. In case that
   * the model has the state "root.loaded.saved" the model was fully loaded
   * and the width and height can be set by the DOM element geometry.
   */
/*
  isLoaded: Ember.observer("model.isLoading", function(){
    //console.log(this.get("model"));
    if(this.get("model.isLoaded")){
      this.addEmptyOutput();

      const element = Ember.$(this.element);
      this.set("model.width", element.width());
      this.set("model.height", element.height());
    }
  }),
*/


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
      const connectToNewBlock = this.get('onConnectToNewBlock');

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
