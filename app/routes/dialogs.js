import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({

  model(params) {
    let store = this.get('store');
    let block = store.createRecord('block', {
      x: 32,
      y: 32
    });




    //block.get('inputs').pushObject(input);


    let block2 = store.createRecord('block', {
      x: 300,
      y: 32
    });





    let dialog = this.get('store').findRecord('dialog', params.dialog_id);
    let startingLine = dialog.get('startingLine');
/*
    let output = store.createRecord('output');
    dialog.get('outputs').pushObject(output);
    let input = store.createRecord('input', {
      output: output
    });
*/
    return dialog;
    /*
    return RSVP.hash({
      blocks: this.get('store').peekAll('block'),
      outputs: this.get('store').peekAll('output')
    });
*/
  }


/*
  model(){
    let store = this.get('store');
    let block = store.createRecord('block', {
      x: 32,
      y: 32
    });

    let output = store.createRecord('output');
    block.get('outputs').pushObject(output);


    //block.get('inputs').pushObject(input);


    let block2 = store.createRecord('block', {
      x: 300,
      y: 32
    });

    let input = store.createRecord('input', {
      output: output
    });
    block2.get('inputs').pushObject(input);
    let output2 = store.createRecord('output');
    block2.get('outputs').pushObject(output2);

    return RSVP.hash({
      blocks: this.get('store').peekAll('block'),
      outputs: this.get('store').peekAll('output')
    });
  }
  */
});
