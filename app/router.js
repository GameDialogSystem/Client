import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('dialogs', { path: '/dialogs' }, function() {
    this.route('edit', { path: '/edit/:dialog_id'});

    this.route('line', function() {
      this.route('edit', { path: '/edit/:line_id'});
    });
  });

  this.route('options');
  this.route('about');
  this.route('character', function() {
    this.route('new');
    this.route('edit');
    this.route('delete');
  });
});

export default Router;
