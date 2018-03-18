import Ember from 'ember';

/**
* Splits the string at a position to display a short preview.
* The process is controlled by the second parameter that indicates the desired
* length of the preview. The string is splitted wordwise and joined afterwards
* as closed as possible at the desired length.
*/
export function prune(params/*, hash*/) {
  const text = params[0];
  const maxLength = params[1];

  let result = '';
  let resultLength = 0;
  if(text === undefined){
    // return an empty string if text is undefined
    return '';
  }else{
    const words = text.split(' ');

    for(let i=0; i<words.length; i++){
      if(resultLength + words[i].length < maxLength){
        resultLength += words[i].length;

        result += words[i] + ' ';
      }else{
        result = result.substring(0, result.length - 1) + "...";
        break;
      }
    }

    return result;
  }
}

export default Ember.Helper.helper(prune);
