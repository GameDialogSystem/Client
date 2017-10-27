
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dialog-line-connector-position', 'helper:dialog-line-connector-position', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{dialog-line-connector-position inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

