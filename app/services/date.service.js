/**
 * Date parser
 * @param {*} dateString 
 * @returns 
 */
exports.dateFr  = (dateString) => {
    const date = new Date(dateString);

    const addZero = (num) => (num < 10 ? `0${num}` : num);
  
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
  
    return `${day}/${month}/${year}`;
};

/**
 * Time formatter
 * @param {*} dateString 
 * @returns 
 */
exports.timeFr  = (dateString) => {
  const date = new Date(dateString);
  const addZero = (num) => (num < 10 ? `0${num}` : num);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());

  return `${hours}:${minutes}`;
};

/**
 * Time UTC 3
 * @param {*} date 
 * @returns 
 */
exports.frTime = (date) => {
  const optionsTime = { hour: '2-digit', minute: '2-digit'  , timeZone: 'UTC' };
  const dateObj = new Date(date);
  const timeFormatee = dateObj.toLocaleTimeString('fr-FR', optionsTime);
  return timeFormatee;
}

/**
 * Date UTC 3
 * @param {*} date 
 * @returns 
 */
exports.frDate = (date) => {
  const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dateObj = new Date(date);
  const dateFormatee = dateObj.toLocaleDateString('fr-FR', optionsDate);
  return dateFormatee;
}


