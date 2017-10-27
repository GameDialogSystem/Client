import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dialog-connector', 'Integration | Component | dialog connector', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dialog-connector}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dialog-connector}}
      template block text
    {{/dialog-connector}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
