import Route from '@ember/routing/route';

export default Route.extend({

      model(params) {
          const store = this.get('store');
          return store.findRecord('dialog', params.dialog_id);
      },

      actions: {
        error(error) {
          if (error.status === '403') {
            this.replaceWith('login');
          } else {
            console.log("This is a stupid errooooor");
            // Let the route above this handle the error.
            return true;
          }
        },


        loading() {
          let controller = this.controllerFor('dialogs.edit');
          controller.set('currentlyLoading', true);

          return true; // allows the loading template to be shown
        }
      }
});
