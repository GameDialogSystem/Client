import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dialog-connector-endpoint', 'Integration | Component | dialog connector endpoint', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dialog-connector-endpoint}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dialog-connector-endpoint}}
      template block text
    {{/dialog-connector-endpoint}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
