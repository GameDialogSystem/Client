import Ember from 'ember';

export default Ember.Component.extend({
  attributes : ["Might", "Constitution", "Dexterity", "Perception", "Intellect", "Resolve"],

  actions: {
    updateAnswer: function(){
      this.get('onInternalChangeAnswer')(this.get('answer'));
    }
  }
});
