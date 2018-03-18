import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-search',

  showSearch: false,

  actions: {
    toggleSearch() {
      this.set('showSearch', !this.get('showSearch'));

      if(this.get('showSearch')){
        $(this.element).find("div.md-input:first").focus();
      }
    },

    change(value) {
      console.log(value);
    }
  }
});
