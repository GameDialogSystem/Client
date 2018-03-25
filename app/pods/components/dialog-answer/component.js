import Component from '@ember/component';

export default Component.extend({
  attributes : ["Might", "Constitution", "Dexterity", "Perception", "Intellect", "Resolve"],

  actions: {
    updateAnswer: function(){
      this.get('onInternalChangeAnswer')(this.get('answer'));
    }
  }
});
