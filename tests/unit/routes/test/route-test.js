import { moduleFor, test } from 'ember-qunit';

moduleFor('route:routes/test', 'Unit | Route | routes/test', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
