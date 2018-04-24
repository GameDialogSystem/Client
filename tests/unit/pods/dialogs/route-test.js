import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dialogs', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dialogs');
    assert.ok(route);
  });
});
