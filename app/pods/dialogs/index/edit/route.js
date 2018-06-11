import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    const store = this.get('store');

    return store.findRecord('dialog', params.dialog_id);
  },

  actions: {
    returnToOverview() {
      window.history.back();
    }
  }
});
