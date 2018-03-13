import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "md-appbar-tab-content",

  actions: {
    click: function(button){
      console.log(button);
    }
  }  
});
