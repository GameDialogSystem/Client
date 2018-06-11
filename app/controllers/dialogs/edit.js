import Ember from 'ember';
import RSVP from 'rsvp';
import {
  inject as service
} from '@ember/service';
import uuidv4 from 'npm:uuid';

/*
const {
  remote
} = requireNode('electron');
*/

export default Ember.Controller.extend({
  isShowingOptions: false,
  answerToBeEdited: null,

  showToast: false,

  leftToRightAutolayout: service('auto-layout'),

  showLoadingDialog: false,

  // zoom level of the dialog graph
  zoomLevel: 100,

  host: '',

  init() {
    this._super(...arguments);

    this.set('host', this.get('store').adapterFor('application').get('host'))
  },

  flatArray(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flatArray(val)) : acc.concat(val), []);
  },

  blockIsContainedWithinSelection(block, selectedBlocks) {
    const id = block.get('id');

    let result = false;
    selectedBlocks.forEach(block => {
      if (block.get('model.id') === id) {
        result = true;
      }
    });

    return result;
  },

  deletesAllChildren(block, selectedBlocks) {


    const connectedOutputs = block.get('outputs').filterBy('isConnected');
    if (connectedOutputs.length === 0) {
      return this.blockIsContainedWithinSelection(block, selectedBlocks);
    }

    const results = block.get('outputs').filterBy('isConnected').map(output => {
      const child = output.get('connection.input.belongsTo');

      return this.deletesAllChildren(child, selectedBlocks);
    })

    return results;
  },

  actions: {
    rerouteToIndex() {
      this.transitionToRoute('index');
    },

    /**
     * Adds a new block to the model.
     *
     * @param {Output} output - the outgoing pin where the action was initialized
     * @param {Point} point - the position where the mouse button was released and
     * the new block should be inserted
     */
    createNewDialogLine(output, point) {
      const store = this.get('store');
      const dialog = this.get('model');

      const input = store.createRecord('input', {
        id: uuidv4(),

        x: point.x,
        y: point.y
      });


      const connection = store.createRecord('connection', {
        id: uuidv4(),

        input: input,
        output: output
      });

      input.set("connection", connection);
      output.set("connection", connection);

      const dialogLine = store.createRecord('dialog-line', {
        id: uuidv4(),
        belongsTo: dialog,
        message: `Random Text ${Math.floor((Math.random() * 100) + 1)}`,
        x: point.x - 27,
        y: point.y - 20,

        inputs: [
          input
        ]
      });






      // add the blank output to allow the connection of grandchildren
      //dialogLine.get("outputs").pushObject(newOutput);
      input.set('belongsTo', dialogLine);

      dialog.get('lines').pushObject(dialogLine);


      const self = this;
      setTimeout(function() {
        self.send("automaticallyRelocateLines", dialog.get("startingLine"));
      }, 100)
    },


    /**
     * automaticallyRelocateLines - Automatically lines within a perfect
     * layout.
     *
     * Be aware that this function will be moved to the flow logic addon
     * soon.
     *
     * @return {type}  description
     */
    automaticallyRelocateLines(parentLine) {
      parentLine.set("relayoutTimestamp", Date.now());
    },

    undoChange() {
      this.get("model").undo();
    },

    redoChange() {
      this.get("model").redo();
    },


    deleteBlock(block, selectedBlocks) {


      if (block.get('inputs.length') === 0) {
        this.set('toastMessage', 'Deletion cancelled: Cannot delete first dialog line');
        this.set("showToastButton", false);
        this.set('showToast', true);

        return;
      }

      let hasChildren = false;
      block.get('outputs').forEach((output) => {
        if (output.get('isConnected')) {
          hasChildren = true;
        }
      })

      if (hasChildren && this.flatArray(this.deletesAllChildren(block, selectedBlocks)).includes(false)) {


        this.set('toastMessage', 'Deletion cancelled: Message line has children');
        this.set("showToastButton", false);
        this.set('showToast', true);

        return;
      }


      new Promise(function(resolve) {
        block.get('inputs').filterBy('isConnected').forEach(function(input) {
          input.get('connection').then(connection => {
            connection.get('output').then(output => {
              output.destroyRecord().then(() => {
                connection.destroyRecord().then(() => {
                  input.destroyRecord().then(() => {
                    resolve('blub');
                  });
                });
              });
            });
          });
        });
      }).then(() => {
        let outputs = block.get('outputs').map(function(output) {
          return output.destroyRecord();
        })

        RSVP.allSettled(outputs).then(() => {
          block.destroyRecord().then(() => {
            this.set('toastMessage', 'Deleted Message Line');
            this.set("showToastButton", true);
            this.set('showToast', true);

            const dialog = this.get('model');
            this.send("automaticallyRelocateLines", dialog.get("startingLine"));
          })
        });

      });
    },

    cancelReroute() {

    },


    updateDialogLine(dialogLine) {
      this.get('store').findRecord('dialog-line', dialogLine.get('id')).then(function(line) {
        // ...after the record has loaded
        line.save();
      });
    },

    editDialogLine(id) {
      //this.set('showLineEditDialog', true);
      this.get('store').findRecord('dialog-line', id)
        .then((line) => {
          this.set('dialogLine', line);
          this.transitionToRoute('dialogs.line.edit', line)
        })
    },

    connectionReroute() {},

    undo() {
      alert("undo");
    },

    redo() {
      alert("redo");
    },

    relayout() {
      const parentLine = this.get("model.startingLine");

      this.get('leftToRightAutolayout').relayout(parentLine);
    },

    loadDialogFile() {
      this.set('showLoadingDialog', true);
    },

    saveDialogFile() {
      const model = this.get('model');

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


    closeDialog() {
      this.set('showLoadingDialog', false);
    },

    onFileSelect(file) {
      this.transitionToRoute('dialogs.edit', file.fileName + "." + file.extension);

    },

    changeZoomLevel(value) {
      this.set('zoomLevel', value);
    },


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
