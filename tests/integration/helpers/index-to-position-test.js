
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('index-to-position', 'helper:index-to-position', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{index-to-position inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

