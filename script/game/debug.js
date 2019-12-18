'use strict';

(function () {

  var UPDATE_FREQ = 10;

  var updateTickCount = 0;
  var totalTicks = 0;
  var collisionCounter = 0;

  var debugElement = document.querySelector('.debug');

  var showDebugElement = function () {
    debugElement.classList.remove('d-none');
  };

  var updateDebugElement = function () {
    debugElement.innerHTML =
      'Ticks: ' + totalTicks + '<br />' +
      'X: ' + window.stat.x + '<br />' +
      'Y: ' + window.stat.y + '<br />' +
      'C-checks: ' + collisionCounter + '<br />';
  };

  var update = function () {
    if (window.config.DEBUG_ENABLED) {
      updateTickCount++;
      if (updateTickCount === UPDATE_FREQ) {
        updateTickCount = 0;
        totalTicks += UPDATE_FREQ;
        updateDebugElement();
      }
    }
  };

  var collide = function () {
    if (window.config.DEBUG_ENABLED) {
      collisionCounter++;
    }
  };

  var init = function () {
    if (window.config.DEBUG_ENABLED) {
      showDebugElement();
    }
  };

  window.debug = {
    update: update,
    collide: collide,
  };

  init();

})();