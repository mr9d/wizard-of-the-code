'use strict';

(function () {

  var viewAreaCanvas = document.querySelector('.game__scale');
  var renderAreaCanvas = document.querySelector('.game__background-canvas');

  window.config = {
    DEBUG_ENABLED: true,

    TICK_PERIOD_MS: 20,
    TILE_SIZE: 50,

    START_X: -40,
    START_Y: 300,

    PLAYER_COLLISION_WIDTH: 40,
    PLAYER_COLLISION_HEIGHT: 60,
    PLAYER_MOVE_SPEED: 5,
    PLAYER_JUMP_SPEED: 14,
    GRAVITY: 1,

    VIEW_WIDTH: viewAreaCanvas.width,
    VIEW_HEIGHT: viewAreaCanvas.height,

    RENDER_WIDTH: renderAreaCanvas.width,
    RENDER_HEIGHT: renderAreaCanvas.height,

    RENDER_CENTER_X: renderAreaCanvas.width / 2,
    RENDER_CENTER_Y: renderAreaCanvas.height / 2,

    BASELINE_OFFSET: 40,
  };

})();