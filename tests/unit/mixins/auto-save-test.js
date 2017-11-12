import Ember from 'ember';
import AutoSaveMixin from 'ue-dialog/mixins/auto-save';
import { module, test } from 'qunit';

module('Unit | Mixin | auto save');

// Replace this with your real tests.
test('it works', function(assert) {
  let AutoSaveObject = Ember.Object.extend(AutoSaveMixin);
  let subject = AutoSaveObject.create();
  assert.ok(subject);
});
