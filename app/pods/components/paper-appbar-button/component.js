import Component from '@ember/component';

/**
 *
 * @module
 * @augments Ember/Component
 */
export default Component.extend({
  tagName: '',

  actions: {
    onClick(){
      this.get("onClick")();
    }
  }
});
