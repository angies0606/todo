import moment from "moment";

export function passedTimeCalc (creationTime) {
  const creationDate = moment(creationTime);
  let currentDate = moment();
  let diffTime = currentDate.diff(creationDate, 'seconds');
  
  let timeMessage;
  let timeout;

  switch(true) {
    case diffTime >= 86400:
      let isSameYear = moment(creationDate).isSame(currentDate, 'year');
      if(isSameYear) {
        timeMessage = creationDate.format('D MMMM, HH:mm');
        
      } else {
        timeMessage = creationDate.format('D MMMM YYYY, HH:mm');
      }
      timeout = null;
      break;
    case diffTime >= 5400 && diffTime < 86400:
      let isSameDay = moment(creationDate).isSame(currentDate, 'day');
      if(isSameDay) {
        timeMessage = creationDate.format('[Today], HH:mm');
      } else {
        timeMessage = creationDate.format('D MMMM, HH:mm');
      }
      timeout = 82800000;
      break;
    case diffTime >= 3600 && diffTime < 5400:
      timeMessage = 'hour ago';
      timeout = 1200000;
      break;
    case diffTime >= 2400 && diffTime < 3600:
      timeMessage = 'forty minutes ago';
      timeout = 1200000;
      break;
    case diffTime >= 1800 && diffTime < 2400:
      timeMessage = 'half an hour ago';
      timeout = 600000;
      break;
    case diffTime >= 1200 && diffTime < 1800:
      timeMessage = 'twenty minutes ago';
      timeout = 600000;
      break;
    case diffTime >= 600 && diffTime < 1200:
      timeMessage = 'ten minutes ago';
      timeout = 600000;
      break;
    case diffTime >= 300 && diffTime < 600:
      timeMessage = 'five minutes ago';
      timeout = 300000;
      break;
    case diffTime >= 120 && diffTime < 300: 
      timeMessage = 'two minutes ago';
      timeout = 180000;
      break;
    case diffTime >= 60 && diffTime < 120:
      timeMessage = 'a minute ago';
      timeout = 120000;
      break;
    case diffTime >= 0 && diffTime < 60:
      timeMessage = 'a few seconds ago';
      timeout = 60000;
      break;
    default:
      timeMessage = creationDate.format('D MMMM YYYY, HH:mm');
      timeout = null;
  }
  
  return {
    timeMessage,
    timeout
  }
}