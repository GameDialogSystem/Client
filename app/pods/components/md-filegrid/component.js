import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  actions: {
    onFileSelect(file) {
      this.get('onFileSelect')(file);
    }
  }  
});
