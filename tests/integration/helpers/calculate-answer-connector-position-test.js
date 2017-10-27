
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calculate-answer-connector-position', 'helper:calculate-answer-connector-position', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{calculate-answer-connector-position inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

