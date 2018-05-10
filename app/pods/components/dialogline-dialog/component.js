import Component from '@ember/component';



/**
 *
 * @module
 * @augments Ember/Component
 */
export default Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  /**
   * @type {String}
   * @constant
   */
  tagName: '',

  /**
   * @type {String}
   */
  tempValue: '',


  /**
   * didReceiveAttrs - description
   *
   * @function
   * @return {type}  description
   */
  didReceiveAttrs() {
    this._super(...arguments);

    this.set('tempValue', this.get('value'));
  },

  // -------------------------------------------------------------------------
  // Actions

  /** @type {Object} */
  actions: {

    /**
     * onSave - description
     *
     * @function actions:onSave
     * @return {type}  description
     */
    onSave() {
      this.set('value', this.get('tempValue'));
      this.set('dialogFlag', !this.get('dialogFlag'));
    },

    onCancel() {
      this.set('dialogFlag', !this.get('dialogFlag'));
    }
  }

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
