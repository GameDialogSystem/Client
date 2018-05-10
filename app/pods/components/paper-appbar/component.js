import Component from '@ember/component';

/**
 *
 * @module
 * @augments Ember/Component
 */
export default Component.extend({
  tagName: 'md-appbar',

  selectedTab: 'start',

  actions: {
    buttonClicked(action) {
      action.function(action.target);
    }
  }
});
