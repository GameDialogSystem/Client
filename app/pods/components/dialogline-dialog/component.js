import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  tempValue: '',

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('tempValue', this.get('value'));
  },

  actions: {
    onSave() {
      this.set('value', this.get('tempValue'));
      this.set('dialogFlag', !this.get('dialogFlag'));
    },

    onCancel() {
      this.set('dialogFlag', !this.get('dialogFlag'));
    }
  }
});
