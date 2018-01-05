import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-appbar-tab-content', 'Integration | Component | paper appbar tab content', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-appbar-tab-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-appbar-tab-content}}
      template block text
    {{/paper-appbar-tab-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
