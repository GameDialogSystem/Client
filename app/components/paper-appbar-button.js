import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  actions: {
    onClick: function(){
      this.get("onClick")();
    }
  }
});
