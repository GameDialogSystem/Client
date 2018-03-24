import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-search',

  showSearch: false,

  didInsertElement() {
    this._super(...arguments);
  },

  /**
  * Overwrite the didRender function to listen for DOM change events caused
  * by the LiquidFire addon that dynamically adds or removes elements.
  * In case of such event automatically set the focus of the input element
  */
  didRender() {
    this._super(...arguments);

    const input = Ember.$(this.element).find("input");
    if(!input.is(':focus')){
      input.focus();
    }
  },

  actions: {
    toggleSearch() {
      this.set('showSearch', !this.get('showSearch'));

      if(this.get('showSearch')){
        const element = Ember.$(this.element).find('input');
        //console.log(element);
        element.focus();
      }
    },

    change(value) {
      console.log(value);
    }
  }
});
