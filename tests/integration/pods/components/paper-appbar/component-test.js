import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-appbar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{paper-appbar}}`);

    assert.equal(this.element.textContent.trim(), 'cloud_queue');

    // Template block usage:
    await render(hbs`
      {{#paper-appbar}}
        template block text
      {{/paper-appbar}}
    `);

    //assert.equal(this.element.textContent.trim(), 'template block text');
    assert.ok(true);
  });
});
