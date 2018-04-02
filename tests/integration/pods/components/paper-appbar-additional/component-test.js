import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-appbar-additional', 'Integration | Component | paper-appbar-additional', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-appbar-additional}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-appbar-additional}}
      template block text
    {{/paper-appbar-additional}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
