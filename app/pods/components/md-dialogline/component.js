import FlowElement from 'flow-logic/components/flow-element';
import Ember from 'ember';
import uuidv4 from 'npm:uuid';

// this import is a workaround needed by ember browserify see
// https://github.com/ef4/ember-browserify for more information
// about this problem
import ResizeSensor from "npm:css-element-queries";

export default FlowElement.extend({
  // inject the store to create the blank outputs to allow
  // user the creation of new connections from an existing
  // dialog line
  store: Ember.inject.service(),

  autoresizeEnabled : true,


  didInsertElement() {
    this._super(...arguments);

    this.addEmptyOutput();
  },

  addEmptyOutput(){
    let outputs = this.get("model.outputs");

    if(!outputs){
      return new Array();
    }

    const store = this.get('store');
    if(!store){
      return;
    }

    // create an empty output connector to allow the creation of new connections
    let output = store.createRecord('output', {
      id: uuidv4(),
      belongsTo: this.get("model"),
    });

    // add the empty output connector to the dialog line
    this.get("model.outputs").pushObject(output);
  },


  connectedOutputs: Ember.computed('model.outputs.@each.isConnected', function() {
    const outputs = this.get('model.outputs');

    if(!outputs){
      return new Array();
    }

    return outputs.filterBy('isConnected', true);
  }),


  unconnectedOutput: Ember.computed('model.outputs.@each.isConnected', function() {
    const outputs = this.get('model.outputs');

    if(!outputs){
      return new Array();
    }

    return outputs.filterBy('isConnected', false);
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
    connectToNewBlock(output, point){
      const connectToNewBlock = this.get('onConnectToNewBlock');

      if(connectToNewBlock !== null || connectToNewBlock !== undefined){
        connectToNewBlock(output, point);
        this.addEmptyOutput();
      }
    },

    elementEdit(){
      this.get('onElementEdit')();
    }
  }
});
