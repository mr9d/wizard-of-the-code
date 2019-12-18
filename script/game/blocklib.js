'use strict';

(function () {

  var EMPTY_BLOCK = {
    char: ' ',
    drawBackground: function (ctx, leftOffset, topOffset) {
      ctx.fillStyle = 'cyan';
      ctx.fillRect(
        leftOffset,
        topOffset,
        window.config.TILE_SIZE,
        window.config.TILE_SIZE);
      /*ctx.fillStyle = "lightgray";
      ctx.textBaseline = "hanging";
      ctx.fillText(tileNumberX + ', ' + tileNumberY, leftOffset + 2, topOffset + 2);*/
    },
    isCollidable: function () {
      return false;
    },
    isEmitGrass: function () {
      return false;
    },
    isBlockGrass: function () {
      return false;
    },
  };

  var SOLID_BLOCK = {
    char: '#',
    drawBackground: function (ctx, leftOffset, topOffset) {
      ctx.fillStyle = 'brown';
      ctx.fillRect(
        leftOffset,
        topOffset,
        window.config.TILE_SIZE,
        window.config.TILE_SIZE);
    },
    drawGrass: function (ctx, leftOffset, topOffset) {
      ctx.fillStyle = 'green';
      ctx.fillRect(
        leftOffset - 4,
        topOffset - 4,
        window.config.TILE_SIZE + 8,
        12);
    },
    isCollidable: function () {
      return true;
    },
    collideFromLeftSide: function (collisionYMaxFromBlock, collisionYMinFromBlock, collisionXFromBlock) {
      if (collisionYMaxFromBlock <= 0 || collisionYMinFromBlock >= window.config.TILE_SIZE) {
        return collisionXFromBlock;
      }
      return 0;
    },
    collideFromRightSide: function (collisionYMaxFromBlock, collisionYMinFromBlock, collisionXFromBlock) {
      if (collisionYMaxFromBlock <= 0 || collisionYMinFromBlock >= window.config.TILE_SIZE) {
        return collisionXFromBlock;
      }
      return window.config.TILE_SIZE;
    },
    collideFromBottomSide: function (collisionXMaxFromBlock, collisionXMinFromBlock, collisionYFromBlock) {
      if (collisionXMaxFromBlock <= 0 || collisionXMinFromBlock >= window.config.TILE_SIZE) {
        return collisionYFromBlock;
      }
      return 0;
    },
    collideFromTopSide: function (collisionXMaxFromBlock, collisionXMinFromBlock, collisionYFromBlock) {
      if (collisionXMaxFromBlock <= 0 || collisionXMinFromBlock >= window.config.TILE_SIZE) {
        return collisionYFromBlock;
      }
      return window.config.TILE_SIZE;
    },
    isEmitGrass: function () {
      return true;
    },
    isBlockGrass: function () {
      return true;
    },
  };

  var WALL_BLOCK = {
    char: '+',
    drawBackground: function (ctx, leftOffset, topOffset) {
      ctx.fillStyle = 'gray';
      ctx.fillRect(
        leftOffset,
        topOffset,
        window.config.TILE_SIZE,
        window.config.TILE_SIZE);
    },
    isCollidable: function () {
      return false;
    },
    isEmitGrass: function () {
      return false;
    },
    isBlockGrass: function () {
      return true;
    },
  };

  var FLAG_BLOCK = {
    char: '*',
    drawBackground: function (ctx, leftOffset, topOffset) {
      ctx.fillStyle = 'cyan';
      ctx.fillRect(
        leftOffset,
        topOffset,
        window.config.TILE_SIZE,
        window.config.TILE_SIZE);

      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.moveTo(leftOffset + window.config.TILE_SIZE * 0.2, topOffset + window.config.TILE_SIZE * 0.1);
      ctx.lineTo(leftOffset + window.config.TILE_SIZE * 0.8, topOffset + window.config.TILE_SIZE * 0.3);
      ctx.lineTo(leftOffset + window.config.TILE_SIZE * 0.2, topOffset + window.config.TILE_SIZE * 0.5);
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = window.config.TILE_SIZE * 0.05;
      ctx.strokeStyle = 'gray';
      ctx.moveTo(leftOffset + window.config.TILE_SIZE * 0.2, topOffset + window.config.TILE_SIZE * 0.1);
      ctx.lineTo(leftOffset + window.config.TILE_SIZE * 0.2, topOffset + window.config.TILE_SIZE);
      ctx.stroke();
    },
    isCollidable: function () {
      return false;
    },
    isEmitGrass: function () {
      return false;
    },
    isBlockGrass: function () {
      return false;
    },
  };

  var getBlockByChar = function (char) {
    if (char === EMPTY_BLOCK.char) {
      return EMPTY_BLOCK;
    } else if (char === SOLID_BLOCK.char) {
      return SOLID_BLOCK;
    } else if (char === WALL_BLOCK.char) {
      return WALL_BLOCK;
    } else if (char === FLAG_BLOCK.char) {
      return FLAG_BLOCK;
    } else {
      return null;
    }
  };

  window.blocklib = {
    getBlockByChar: getBlockByChar,
  };

})();