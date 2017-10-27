import Ember from 'ember';

export function indexToPosition([index, count]) {
  return 12.5+25*(index+1);
}

export default Ember.Helper.helper(indexToPosition);
