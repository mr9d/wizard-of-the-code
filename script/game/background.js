'use strict';

// Background canvas update only
(function () {
  const EMPTY_FILL_THRESHOLD = window.config.TILE_SIZE * 2;

  var ctx = document.querySelector('.game__background-canvas').getContext('2d');
  var grassCtx = document.querySelector('.game__grass-canvas').getContext('2d');

  var prevX = window.stat.x;
  var prevY = window.stat.y;

  var emptySpace = {
    up: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  var getTileNumberForRenderX = function (renderAreaX) {
    return Math.floor((renderAreaX - window.config.RENDER_CENTER_X + window.stat.x) / window.config.TILE_SIZE);
  };

  var getTileNumberForRenderY = function (renderAreaY) {
    return -1 - Math.floor((renderAreaY - window.config.RENDER_CENTER_Y - window.config.BASELINE_OFFSET - window.stat.y) / window.config.TILE_SIZE);
  };

  var getTileLeftOffset = function (tileNumberX) {
    return window.config.RENDER_CENTER_X - window.stat.x + tileNumberX * window.config.TILE_SIZE;
  };

  var getTileTopOffset = function (tileNumberY) {
    return window.config.RENDER_CENTER_Y + window.config.BASELINE_OFFSET + window.stat.y - (tileNumberY + 1) * window.config.TILE_SIZE;
  };

  var drawTile = function (tileNumberX, tileNumberY) {
    var tileChar = window.level.getTile(tileNumberX, tileNumberY);
    var leftOffset = getTileLeftOffset(tileNumberX);
    var topOffset = getTileTopOffset(tileNumberY);

    var block = window.blocklib.getBlockByChar(tileChar);
    block.drawBackground(ctx, leftOffset, topOffset, tileNumberX, tileNumberY);

    // Hard-coded grass
    var upperTileChar = window.level.getTile(tileNumberX, tileNumberY + 1);
    var upperBlock = window.blocklib.getBlockByChar(upperTileChar);
    if (block.isEmitGrass() && !upperBlock.isBlockGrass()) {
      block.drawGrass(grassCtx, leftOffset, topOffset, tileNumberX, tileNumberY);
    }
  };

  var fillAreaWithTiles = function (x1, y1, x2, y2) {
    var minTileX = getTileNumberForRenderX(x1);
    var maxTileX = getTileNumberForRenderX(x2);
    var minTileY = getTileNumberForRenderY(y2);
    var maxTileY = getTileNumberForRenderY(y1);
    for (var tileX = minTileX; tileX <= maxTileX; tileX += 1) {
      for (var tileY = minTileY; tileY <= maxTileY; tileY += 1) {
        drawTile(tileX, tileY);
      }
    }
  };

  var init = function () {
    fillAreaWithTiles(
      0,
      0,
      window.config.RENDER_WIDTH - 1,
      window.config.RENDER_HEIGHT - 1);
  };

  var isUpdateRequired = function () {
    return prevX !== window.stat.x || prevY !== window.stat.y;
  };

  var getDx = function () {
    return window.stat.x - prevX;
  };

  var getDy = function () {
    return window.stat.y - prevY;
  };

  var savePrevCoordinates = function () {
    prevX = window.stat.x;
    prevY = window.stat.y;
  };

  var moveBackground = function (dx, dy) {
    // var imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    // ctx.putImageData(imageData, - window.stat.x + backgroundX, window.stat.y - backgroundY);
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(ctx.canvas, -dx, dy);
    ctx.globalCompositeOperation = 'source-over';

    // Grass
    grassCtx.globalCompositeOperation = 'copy';
    grassCtx.drawImage(grassCtx.canvas, -dx, dy);
    grassCtx.globalCompositeOperation = 'source-over';
  };

  var updateEmptySpace = function (dx, dy) {
    emptySpace.up = Math.max(0, emptySpace.up + dy);
    emptySpace.right = Math.max(0, emptySpace.right + dx);
    emptySpace.bottom = Math.max(0, emptySpace.bottom - dy);
    emptySpace.left = Math.max(0, emptySpace.left - dx);
  };

  var fillEmptySpaceIfRequired = function () {
    if (emptySpace.up > EMPTY_FILL_THRESHOLD) {
      fillAreaWithTiles(
        0,
        0,
        window.config.RENDER_WIDTH - 1,
        emptySpace.up);
      emptySpace.up = 0;
    }
    if (emptySpace.right > EMPTY_FILL_THRESHOLD) {
      fillAreaWithTiles(
        window.config.RENDER_WIDTH - emptySpace.right,
        0,
        window.config.RENDER_WIDTH - 1,
        window.config.RENDER_HEIGHT - 1);
      emptySpace.right = 0;
    }
    if (emptySpace.bottom > EMPTY_FILL_THRESHOLD) {
      fillAreaWithTiles(
        0,
        window.config.RENDER_HEIGHT - emptySpace.bottom,
        window.config.RENDER_WIDTH - 1,
        window.config.RENDER_HEIGHT - 1);
      emptySpace.bottom = 0;
    }
    if (emptySpace.left > EMPTY_FILL_THRESHOLD) {
      fillAreaWithTiles(
        0,
        0,
        emptySpace.left,
        window.config.RENDER_HEIGHT - 1);
      emptySpace.left = 0;
    }
  };

  var update = function () {
    if (!isUpdateRequired()) {
      return;
    }
    var dx = getDx();
    var dy = getDy();
    moveBackground(dx, dy);
    updateEmptySpace(dx, dy);
    fillEmptySpaceIfRequired();
    savePrevCoordinates();
  };

  window.background = {
    update: update,
  };

  init();

})();