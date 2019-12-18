'use strict';

(function () {

  const SCALE = 4;
  const SPRITE_WIDTH = 16;
  const SPRITE_HEIGHT = 16;

  var spritesImage;

  var init = function (callback) {
    spritesImage = new Image();
    spritesImage.onload = callback;
    spritesImage.src = 'sprite/wizard.png';
  };

  var drawPlayerRight = function (ctx) {
    ctx.clearRect(
      window.config.RENDER_CENTER_X - SPRITE_WIDTH * SCALE / 2,
      window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET - SPRITE_HEIGHT * SCALE,
      SPRITE_WIDTH * SCALE,
      SPRITE_HEIGHT * SCALE);

    ctx.drawImage(spritesImage,
      0,
      0,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      window.config.RENDER_CENTER_X - SPRITE_WIDTH * SCALE / 2,
      window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET - SPRITE_HEIGHT * SCALE,
      SPRITE_WIDTH * SCALE,
      SPRITE_HEIGHT * SCALE);
  };

  var drawPlayerLeft = function (ctx) {
    ctx.clearRect(
      window.config.RENDER_CENTER_X - SPRITE_WIDTH * SCALE / 2,
      window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET - SPRITE_HEIGHT * SCALE,
      SPRITE_WIDTH * SCALE,
      SPRITE_HEIGHT * SCALE);

    ctx.drawImage(spritesImage,
      SPRITE_WIDTH,
      0,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      window.config.RENDER_CENTER_X - SPRITE_WIDTH * SCALE / 2,
      window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET - SPRITE_HEIGHT * SCALE,
      SPRITE_WIDTH * SCALE,
      SPRITE_HEIGHT * SCALE);
  };

  window.spritelib = {
    init: init,
    drawPlayerRight: drawPlayerRight,
    drawPlayerLeft: drawPlayerLeft,
  };

})();