import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',

  classNames: ['md-table'],

  attributeBindings: ['cellspacing', 'cellpadding'],

  cellspacing: 0,
  cellpadding: 0
});
