import Route from '@ember/routing/route';
//const {remote} = requireNode('electron');

export default Route.extend({
  actions: {
    maximize() {
/*
      var window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }
*/
    },

    minimize() {
      /*
      var window = remote.getCurrentWindow();
      window.minimize();
      */
    },

    close() {
      /*
      var window = remote.getCurrentWindow();
      window.close();
      */
    }
  }
});
