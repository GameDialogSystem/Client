import Route from '@ember/routing/route';

export default Route.extend({
  showNewLineDialog: false,

  model() {
    return this.store.findAll('dialog');
  }
});
