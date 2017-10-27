import { test } from 'qunit';
import moduleForAcceptance from 'ue-dialog/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | contact');

test('visiting /contact', function(assert) {
  visit('/contact');

  andThen(function() {
    assert.equal(currentURL(), '/contact');
  });
});
