import Component from '@ember/component';

export default Component.extend({
  tagName: 'md-appbar',

  selectedTab: 'start',

  actions: {
    buttonClicked(action) {
      action.function(action.target);
    }
  }
});
