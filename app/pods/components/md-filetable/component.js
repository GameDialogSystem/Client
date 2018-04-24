import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  tagName: 'table',

  classNames: ['md-table'],

  attributeBindings: ['cellspacing', 'cellpadding'],

  cellspacing: 0,
  cellpadding: 0,

  sortOrder: 'desc',

  sortColumn: 'title',


  sortedFiles: Ember.computed('files', 'sortColumn', 'sortOrder', function() {
    const sortColumn = this.get('sortColumn');
    const sortOrder = this.get('sortOrder');

    let array = this.get('files');
    if(!array){
      return new Array();
    }

    array.sort((a, b) => {
      let value1;
      let value2;

      if(sortColumn === "title"){
        value1 = a.fileName.toUpperCase();
        value2 = b.fileName.toUpperCase();
      }

      if(sortColumn === "last modified"){
        value1 = a.lastModifiedTimestamp;
        value2 = b.lastModifiedTimestamp;
      }

      if(sortColumn === "extension"){
        value1 = a.extension.toUpperCase();
        value2 = b.extension.toUpperCase();
      }

      if(value1 === value2) return 0;
      if(value1 < value2) return (sortOrder === 'asc') ? -1 :  1;
      if(value1 > value2) return (sortOrder === 'asc') ?  1 : -1;
    });

    return array;
  }),


  actions: {
    sort(column) {
      let sortOrder = this.get('sortOrder');
      sortOrder = (sortOrder === 'desc') ? 'asc' : 'desc';

      if(this.get('sortColumn') !== column){
        this.set('sortOrder', 'asc');
      }else{
        this.set('sortOrder', sortOrder);
      }

      this.set('sortColumn', column);
    },

    onFileSelect(file){
      this.get('onFileSelect')(file);
    }
  }
});
