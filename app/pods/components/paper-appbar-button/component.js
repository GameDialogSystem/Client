import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  actions: {
    onClick(){
      this.get("onClick")();
    }
  }  
});
