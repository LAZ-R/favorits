export const getRandomIntegerBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const roundTo = (n, digits) => {
  var negative = false;
  if (digits === undefined) {
      digits = 0;
  }
  if (n < 0) {
      negative = true;
      n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.floor(n) / multiplicator).toFixed(digits);
  if (negative) {
      n = (n * -1).toFixed(digits);
  }
  return n;
}

/**
 * 
 * @param {HTMLElement} htmlelement 
 * @param {Integer} sensitivity 
 * @param {Function} functionForLeftSwipe 
 * @param {Function} functionForRightSwipe 
 */
export const handleSwipe = (htmlelement, sensitivity, onLeftSwipeFunction, onRightSwipeFunction) => {
  let touchstartX = 0; 
  let touchendX = 0; 

  let finalSensitivity = sensitivity ? sensitivity : 111;
  
  // Ajout des Event Listener pour capter le mouvement
  
  // position au début du mouvement
  htmlelement.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
  })
  
  // position à la fin du mouvement
  htmlelement.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      let difference = touchstartX - touchendX;
      // traitement si swipe gauche
      if (difference > finalSensitivity) { onLeftSwipeFunction.apply() }
      // traitement si swipe droite
      if (difference < -finalSensitivity) { onRightSwipeFunction.apply(); }
  });
};