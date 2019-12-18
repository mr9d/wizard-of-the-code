'use strict';

(function () {

  const LEFT_ARROW_KEY_CODE = 37;
  const UP_ARROW_KEY_CODE = 38;
  const RIGHT_ARROW_KEY_CODE = 39;
  const DOWN_ARROW_KEY_CODE = 40;
  const JUMP_BUTTON_KEY_CODE = 18; // alt
  const FIRE_BUTTON_KEY_CODE = 17; // ctrl

  const JUMP_COMMAND = 'jump';
  const FIRE_COMMAND = 'fire';

  var leftArrowPressed = false;
  var upArrowPressed = false;
  var rightArrowPressed = false;
  var downArrowPressed = false;

  var commands = [];

  var getXDirection = function () {
    if (leftArrowPressed === rightArrowPressed) {
      return 0;
    }
    return leftArrowPressed ? -1 : 1;
  };

  var getYDirection = function () {
    if (upArrowPressed === downArrowPressed) {
      return 0;
    }
    return downArrowPressed ? -1 : 1;
  };

  var getNextCommand = function () {
    if (commands.length > 0) {
      return commands.shift();
    }
    return null;
  };

  var isCommandJump = function (command) {
    return command === JUMP_COMMAND;
  };

  var isCommandFire = function (command) {
    return command === FIRE_COMMAND;
  };

  var keyDownHandler = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode === LEFT_ARROW_KEY_CODE) {
      leftArrowPressed = true;
    } else if (evt.keyCode === UP_ARROW_KEY_CODE) {
      upArrowPressed = true;
    } else if (evt.keyCode === RIGHT_ARROW_KEY_CODE) {
      rightArrowPressed = true;
    } else if (evt.keyCode === DOWN_ARROW_KEY_CODE) {
      downArrowPressed = true;
    } else if (evt.keyCode === JUMP_BUTTON_KEY_CODE) {
      commands.push(JUMP_COMMAND);
    } else if (evt.keyCode === FIRE_BUTTON_KEY_CODE) {
      commands.push(FIRE_COMMAND);
    } else {
      return;
    }
    evt.preventDefault();
  };

  var keyUpHandler = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode === LEFT_ARROW_KEY_CODE) {
      leftArrowPressed = false;
    } else if (evt.keyCode === UP_ARROW_KEY_CODE) {
      upArrowPressed = false;
    } else if (evt.keyCode === RIGHT_ARROW_KEY_CODE) {
      rightArrowPressed = false;
    } else if (evt.keyCode === DOWN_ARROW_KEY_CODE) {
      downArrowPressed = false;
    } else {
      return;
    }
    evt.preventDefault();
  };

  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  window.control = {
    getXDirection: getXDirection,
    getYDirection: getYDirection,
    getNextCommand: getNextCommand,
    isCommandJump: isCommandJump,
    isCommandFire: isCommandFire,
  };

})();