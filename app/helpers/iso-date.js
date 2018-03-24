import Ember from 'ember';

export function isoDate(params/*, hash*/) {
  const date = new Date(params[0]);

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = (month < 10) ? '0' + month : month;

  let day = date.getDate();
  day = (day < 10) ? '0' + day : day;

  let hours = date.getHours();
  hours = (hours < 10) ? '0' + hours : hours;

  let minutes = date.getMinutes();
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  let seconds = date.getSeconds();
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return year + "-" +
         month + "-" +
         day + " " +
         hours + ":" +
         minutes + ":" +
         seconds;
}

export default Ember.Helper.helper(isoDate);
