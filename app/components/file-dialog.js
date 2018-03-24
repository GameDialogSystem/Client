import Ember from 'ember';

import { Promise } from '@ember';

export default Ember.Component.extend({
  tagName: '',

  directory: 'null',

  search: '',

  viewType: 'list',

  withoutFilesAndFolders: Ember.computed('filteredFiles', 'directories', function() {
    return this.get('filteredFiles.length') === 0 && this.get('directories.length') === 0;
  }),

  filteredFiles: Ember.computed('files', 'search', function(){
    let files = this.get('files');
    let search = this.get('search').replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");

    if(files === undefined) {
      return [];
    }

    return files.filter(file => {
      return file.fileName.match(search) !== null;
    })
  }),

  currentDirectory: Ember.computed('directory', function() {
    const directory = this.get('directory');

    if(directory === 'null'){
      return ["Home"];
    }else{
      let elements = directory.split("+").join("+|+").split("+");
      elements.unshift("|");
      elements.unshift("Home");

      return elements;
    }
  }),

  host: '',

  getJSON(url) {
    const self = this;
    return new Promise((resolve, reject) => {

      let xhr = new XMLHttpRequest();
      xhr.open('GET', self.get('host') + '/io/' + url.replace('/', '+'));
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      }
    });
  },

  findFiles(){
    if(this.get('isFindingDirectories')) { return; }

    this.set('isFindingDirectories', true);
    this.getJSON(this.get('directory'))
    .then(result => {
       if (this.isDestroyed) { return; }

       let directories = [];
       let files = [];
       result.forEach(file => {
         if(file.fileName[0] !== "."){
           if(!file.isFile && file.isDirectory){
             directories.push(file);
           }else {
             files.push(file);
           }
         }


       })

       this.set('directories', directories);
       this.set('files', files);

       this.set('isFindingDirectories', false);
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.findFiles();
  },


  actions: {
    closeDialog() {
      this.get("onCloseDialog")();
    },

    onFileSelect(file) {
      this.get("onCloseDialog")();
      this.get('onFileSelect')(file);
    },

    view(type) {
      this.set('viewType', type);
    },

    getFiles(path) {
      const currentPath = this.get('directory');

      this.set('directory', ((currentPath !== "null") ? (currentPath + "+") : "") + path);
      this.findFiles();
    },

    getFilesFromFragment(index){
      const directory = this.get('currentDirectory');

      if(index !== 0){
        const slicedDirectory = directory.slice(1, index+1).join('+').replace(/\+\|\+/g, '+');
        this.set('directory', slicedDirectory.replace('|+', ''));
      }else{
        this.set('directory', 'null');
      }

      this.findFiles();

    }
  }
});
