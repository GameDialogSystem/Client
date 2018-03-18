import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  actions: {
    onClick: function(){
      const click = this.get("onClick");

      if(click !== undefined){
        click();
      }      
    }
  }
});
