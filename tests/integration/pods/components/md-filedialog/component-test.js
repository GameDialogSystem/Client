import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md-filedialog', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{md-filedialog}}`);

    //assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#md-filedialog}}
        template block text
      {{/md-filedialog}}
    `);

    //assert.equal(this.element.textContent.trim(), 'template block text');
    assert.ok(true);
  });
});
