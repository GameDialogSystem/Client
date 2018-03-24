import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-appbar',

  selectedTab: 'start',

  actions: {
    buttonClicked(action) {
      console.log(action);
      action.function(action.target);
    }
  }
});
