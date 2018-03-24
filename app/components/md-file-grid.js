import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  actions: {
    onFileSelect(file) {
      this.get('onFileSelect')(file);
    }
  }
});
