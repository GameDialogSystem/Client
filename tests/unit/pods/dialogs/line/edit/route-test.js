import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dialogs/line/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dialogs/line/edit');
    assert.ok(route);
  });
});
