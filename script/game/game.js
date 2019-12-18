'use strict';

(function () {

  var getTileNumberX = function (x) {
    return Math.floor(x / window.config.TILE_SIZE);
  };

  var getTileNumberY = function (y) {
    return Math.floor(y / window.config.TILE_SIZE);
  };

  var moveRight = function (deltaX) {
    var collisionYMax = window.stat.y + window.config.PLAYER_COLLISION_HEIGHT;
    var collisionYMin = window.stat.y;
    var startX = window.stat.x + window.config.PLAYER_COLLISION_WIDTH / 2;
    var collisionX = startX + deltaX;
    var tileNumberX = getTileNumberX(collisionX);
    for (var tileNumberY = getTileNumberY(collisionYMin); tileNumberY <= getTileNumberY(collisionYMax); tileNumberY++) {
      var tileChar = window.level.getTile(tileNumberX, tileNumberY);
      var block = window.blocklib.getBlockByChar(tileChar);
      if (block.isCollidable()) {
        window.debug.collide();
        var tileX = tileNumberX * window.config.TILE_SIZE;
        var tileY = tileNumberY * window.config.TILE_SIZE;
        var collisionYMaxFromBlock = collisionYMax - tileY;
        var collisionYMinFromBlock = collisionYMin - tileY;
        var collisionXFromBlock = collisionX - tileX;
        var proposedX = tileX + block.collideFromLeftSide(collisionYMaxFromBlock, collisionYMinFromBlock, collisionXFromBlock);
        if (proposedX < collisionX) {
          collisionX = proposedX;
        }
      }
    }
    window.stat.x = collisionX - window.config.PLAYER_COLLISION_WIDTH / 2;
  };

  var moveLeft = function (deltaX) {
    var collisionYMax = window.stat.y + window.config.PLAYER_COLLISION_HEIGHT;
    var collisionYMin = window.stat.y;
    var startX = window.stat.x - window.config.PLAYER_COLLISION_WIDTH / 2;
    var collisionX = startX + deltaX;
    var tileNumberX = getTileNumberX(collisionX);
    for (var tileNumberY = getTileNumberY(collisionYMin); tileNumberY <= getTileNumberY(collisionYMax); tileNumberY++) {
      var tileChar = window.level.getTile(tileNumberX, tileNumberY);
      var block = window.blocklib.getBlockByChar(tileChar);
      if (block.isCollidable()) {
        window.debug.collide();
        var tileX = tileNumberX * window.config.TILE_SIZE;
        var tileY = tileNumberY * window.config.TILE_SIZE;
        var collisionYMaxFromBlock = collisionYMax - tileY;
        var collisionYMinFromBlock = collisionYMin - tileY;
        var collisionXFromBlock = collisionX - tileX;
        var proposedX = tileX + block.collideFromRightSide(collisionYMaxFromBlock, collisionYMinFromBlock, collisionXFromBlock);
        if (proposedX > collisionX) {
          collisionX = proposedX;
        }
      }
    }
    window.stat.x = collisionX + window.config.PLAYER_COLLISION_WIDTH / 2;
  };

  var updateLookHDirection = function (xDirection) {
    if (xDirection > 0) {
      window.stat.lookHDirection = 1;
    }
    else if (xDirection < 0) {
      window.stat.lookHDirection = -1;
    }
    else {
      window.stat.lookHDirection = 0;
    }
  };

  var moveHorizontally = function () {
    var xDirection = window.control.getXDirection();
    updateLookHDirection(xDirection);
    if (xDirection !== 0) {
      if (xDirection > 0) {
        moveRight(xDirection * window.config.PLAYER_MOVE_SPEED);
      } else {
        moveLeft(xDirection * window.config.PLAYER_MOVE_SPEED);
      }
      window.stat.air = true;
    }
  };

  var moveUp = function (deltaY) {
    var collisionXMax = window.stat.x + window.config.PLAYER_COLLISION_WIDTH / 2;
    var collisionXMin = window.stat.x - window.config.PLAYER_COLLISION_WIDTH / 2;
    var startY = window.stat.y + window.config.PLAYER_COLLISION_HEIGHT;
    var collisionY = startY + deltaY;
    var tileNumberY = getTileNumberY(collisionY);
    var collisionDetected = false;
    for (var tileNumberX = getTileNumberX(collisionXMin); tileNumberX <= getTileNumberX(collisionXMax); tileNumberX++) {
      var tileChar = window.level.getTile(tileNumberX, tileNumberY);
      var block = window.blocklib.getBlockByChar(tileChar);
      if (block.isCollidable()) {
        window.debug.collide();
        var tileX = tileNumberX * window.config.TILE_SIZE;
        var tileY = tileNumberY * window.config.TILE_SIZE;
        var collisionXMaxFromBlock = collisionXMax - tileX;
        var collisionXMinFromBlock = collisionXMin - tileX;
        var collisionYFromBlock = collisionY - tileY;
        var proposedY = tileY + block.collideFromBottomSide(collisionXMaxFromBlock, collisionXMinFromBlock, collisionYFromBlock);
        if (proposedY < collisionY) {
          collisionY = proposedY;
          collisionDetected = true;
        }
      }
    }
    window.stat.y = collisionY - window.config.PLAYER_COLLISION_HEIGHT;
    if (collisionDetected) {
      window.stat.vSpeed = 0;
    }
  };

  var moveDown = function (deltaY) {
    var collisionXMax = window.stat.x + window.config.PLAYER_COLLISION_WIDTH / 2;
    var collisionXMin = window.stat.x - window.config.PLAYER_COLLISION_WIDTH / 2;
    var startY = window.stat.y;
    var collisionY = startY + deltaY;
    var tileNumberY = getTileNumberY(collisionY);
    var collisionDetected = false;
    for (var tileNumberX = getTileNumberX(collisionXMin); tileNumberX <= getTileNumberX(collisionXMax); tileNumberX++) {
      var tileChar = window.level.getTile(tileNumberX, tileNumberY);
      var block = window.blocklib.getBlockByChar(tileChar);
      if (block.isCollidable()) {
        window.debug.collide();
        var tileX = tileNumberX * window.config.TILE_SIZE;
        var tileY = tileNumberY * window.config.TILE_SIZE;
        var collisionXMaxFromBlock = collisionXMax - tileX;
        var collisionXMinFromBlock = collisionXMin - tileX;
        var collisionYFromBlock = collisionY - tileY;
        var proposedY = tileY + block.collideFromTopSide(collisionXMaxFromBlock, collisionXMinFromBlock, collisionYFromBlock);
        if (proposedY > collisionY) {
          collisionY = proposedY;
          collisionDetected = true;
        }
      }
    }
    window.stat.y = collisionY;
    if (collisionDetected) {
      window.stat.air = false;
      window.stat.vSpeed = 0;
    }
  };

  var moveVertically = function () {
    if (window.stat.air) {
      if (window.stat.vSpeed !== 0) {
        if (window.stat.vSpeed > 0) {
          moveUp(window.stat.vSpeed);
        } else {
          moveDown(window.stat.vSpeed);
        }
      }
      if (window.stat.vSpeed > -window.config.PLAYER_JUMP_SPEED) {
        window.stat.vSpeed -= window.config.GRAVITY;
      }
    }
  };



  var processJumpCommand = function () {
    if (!window.stat.air) {
      window.stat.vSpeed = window.config.PLAYER_JUMP_SPEED;
      window.stat.air = true;
    }
  };

  var processFireCommand = function () {
    console.log('Fire!');
  };

  var processCommand = function () {
    var command = window.control.getNextCommand();
    if (window.control.isCommandJump(command)) {
      processJumpCommand();
    } else if (window.control.isCommandFire(command)) {
      processFireCommand();
    }
  };






  var updateView = function () {
    window.background.update();
    window.player.update();
  };

  var updateDebug = function () {
    window.debug.update();
  };

  var init = function (callback) {
    window.spritelib.init(function () {
      window.player.init();
      callback();
    });
  };

  var performTick = function () {
    moveVertically();
    processCommand();
    moveHorizontally();
    updateView();
    updateDebug();
  };

  window.game = {
    init: init,
    performTick: performTick,
  };
})();