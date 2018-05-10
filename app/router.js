import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dialogs', function() {
    this.route('edit', { path: '/edit/:dialog_id'});

    this.route('line', function() {
      this.route('edit', { path: '/edit/:line_id'});
    });
  });
});

export default Router;
