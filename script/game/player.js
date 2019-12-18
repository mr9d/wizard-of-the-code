'use strict';

// Player canvas update only
(function () {

  var ctx = document.querySelector('.game__player-canvas').getContext('2d');
  ctx.imageSmoothingEnabled = false;

  var lastDirection;

  /*var drawBaseline = function () {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(
      window.config.RENDER_CENTER_X - window.config.VIEW_WIDTH / 4,
      window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET);
    ctx.lineTo(
      window.config.RENDER_CENTER_X + window.config.VIEW_WIDTH / 4,
      window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET);
    ctx.stroke();
  };

  var drawCollisionBox = function () {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(
      window.config.RENDER_CENTER_X - window.config.PLAYER_COLLISION_WIDTH / 2,
      window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET - window.config.PLAYER_COLLISION_HEIGHT,
      window.config.PLAYER_COLLISION_WIDTH,
      window.config.PLAYER_COLLISION_HEIGHT);
  };*/

  var drawPlayer = function () {
    if (window.stat.lookHDirection < 0) {
      window.spritelib.drawPlayerLeft(ctx);
    } else {
      window.spritelib.drawPlayerRight(ctx);
    }

  };

  var isUpdateRequired = function () {
    return window.stat.lookHDirection !== 0 && lastDirection !== window.stat.lookHDirection;
  };

  var update = function () {
    if (!isUpdateRequired()) {
      return;
    }
    console.log('redraw!');
    drawPlayer();
    lastDirection = window.stat.lookHDirection;
  };

  var init = function () {
    //drawBaseline();
    drawPlayer();
  };

  window.player = {
    init: init,
    update: update,
  };

})();