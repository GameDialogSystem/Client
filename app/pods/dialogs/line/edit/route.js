import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    returnToOverview() {
      window.history.back();
    }
  }
});
