import Ember from 'ember';

export function concatenate(params/*, hash*/) {
  console.log(params[0] + params[1]);
  return params[0] + params[1];
}

export default Ember.Helper.helper(concatenate);
