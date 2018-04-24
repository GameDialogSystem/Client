import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | iso-date', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', new Date("October 13, 2018 12:34:56"));

    await render(hbs`{{iso-date inputValue}}`);

    assert.equal(this.element.textContent.trim(), '2018-10-13 12:34:56');
  });
});
