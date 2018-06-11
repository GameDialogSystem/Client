import Component from '@ember/component';

export default Component.extend({
  classNames: ['md-option-group'],
  classNameBindings: ['isExpanded:expanded'],

  init() {
    this._super(...arguments);
  },
  actions: {
    toggle (){
      this.set('isExpanded', !this.isExpanded);
      this.get('onToggle')(this);
    }
  }
});
