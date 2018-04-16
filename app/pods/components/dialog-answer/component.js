import Component from '@ember/component';

export default Component.extend({
  attributes : ["Might", "Constitution", "Dexterity", "Perception", "Intellect", "Resolve"],

  actions: {
    updateAnswer(){
      this.get('onInternalChangeAnswer')(this.get('answer'));
    }
  }
});
