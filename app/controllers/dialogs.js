import Ember from 'ember';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
  dialogEditController: Ember.inject.controller('dialogs.edit'),

  leftToRightAutolayout: service('auto-layout'),

  showLoadingDialog: false,

  host: '',

  init() {
    this._super(...arguments);

    this.set('host', this.get('store').adapterFor('application').get('host'))
  },

  actions: {
    undo() {
      alert("undo");
    },

    redo() {
      alert("redo");
    },

    relayout() {
      const parentLine = this.get("dialogEditController.model.startingLine");

      this.get('leftToRightAutolayout').relayout(parentLine);
    },

    loadDialogFile() {
      this.set('showLoadingDialog', true);
    },

    saveDialogFile() {
      const model = this.get('dialogEditController.model');

      const store = this.get('store');

      // save dialog line always before connectors and connections
      RSVP.allSettled(store.peekAll('dialog-line').filter(dialogLine => (dialogLine.get('isNew') || dialogLine.get('isDeleted') || dialogLine.get('hasDirtyAttributes'))).map(dialogLine => {
        return dialogLine.save();
      })).then(() => {
        let models = ['output', 'input'];

        let connectorsPromises = new Array();
        models.forEach(model => {
          let connectors = store.peekAll(model).filter(connector =>
            (connector.get('isNew') && connector.get('isConnected')));

          connectorsPromises = connectorsPromises.concat(connectors.map(connector => {
            return connector.save().then(() => {
              if (connector.get('connection').then) {
                connector.get('connection').then(connection => {
                  return connection.save();
                });
              }
            });
          }));
        });


        RSVP.allSettled(connectorsPromises).then(() => {
          model.save();
        });
      });
    },
    /*
    let pendingSaves = new Array();
    model.get('lines').forEach(line => {
      if (line.get('isNew')) {
        line.save().then(() => {
          line.get('inputs').forEach(input => {
            input.get('connection').then(connection => {
              connection.save().then(() => {
                input.save();
              });
            });
          });
          //pendingSaves.push(RSVP.allSettled(line.get('inputs').map(input => input.save())));
        });
      }
    });

    RSVP.allSettled(pendingSaves).then(() => {
      console.log("Ready to take off");
    })
    */
    //RSVP.allSettled(model.get('lines').map(line => line.save())).then(function(array){
    //  model.save();
    //});


    //


    /*
    $.ajax({
      data: model,
      dataType: 'json',
      method: 'POST',
      url: 'http://localhost:3000/dialogs/testing.xml',

      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then((digitalInventory) => {
      //this.get('store').pushPayload(digitalInventory);
      //this.transitionTo('thank-you');
    });
    */


    closeDialog() {
      this.set('showLoadingDialog', false);
    },

    onFileSelect(file) {
      this.transitionToRoute('dialogs.edit', file.fileName + "." + file.extension);

    }
  }
});
