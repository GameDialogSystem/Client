import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dialogs/index/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dialogs/index/edit');
    assert.ok(route);
  });
});
