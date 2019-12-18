'use strict';

(function () {

  var tick = function () {
    var tickStart = Date.now();
    window.game.performTick();
    setTimeout(tick, window.config.TICK_PERIOD_MS - Date.now() + tickStart);
  };

  window.game.init(tick);
  //tick();

})();