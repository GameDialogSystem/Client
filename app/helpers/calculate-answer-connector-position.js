import Ember from 'ember';

export function calculateAnswerConnectorPosition([line, ...params]) {
  console.log(line);
  return params;
}

export default Ember.Helper.helper(calculateAnswerConnectorPosition);
