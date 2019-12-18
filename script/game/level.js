'use strict';

(function () {

  const TILES = [
    [' ', ' ', ' ', ' ', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', ' '],
    [' ', ' ', ' ', ' ', '+', '+', '#', '#', '#', '#', '#', '#', '#', '+', ' '],
    [' ', ' ', ' ', ' ', '+', '#', ' ', ' ', '#', ' ', ' ', ' ', '+', '+', ' '],
    [' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', ' ', '*', ' ', '+', '+', ' '],
    [' ', ' ', ' ', ' ', '+', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', ' '],
    [' ', ' ', '#', ' ', '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' '],
    [' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+', ' '],
    [' ', ' ', ' ', ' ', '#', ' ', ' ', '#', ' ', '#', ' ', '#', ' ', '+', ' '],
    [' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' '],
    [' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' '],
    [' ', ' ', ' ', ' ', '+', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', ' '],
    [' ', ' ', ' ', ' ', '+', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' '],
    [' ', ' ', ' ', ' ', '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+', ' '],
    [' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+', ' '],
    [' ', ' ', ' ', ' ', '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+', ' '],
    [' ', ' ', ' ', ' ', '+', ' ', ' ', '#', '#', '#', ' ', ' ', ' ', '#', '#'],
    [' ', ' ', ' ', ' ', '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '+'],
    [' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '+'],
    [' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', '+', '#', ' '],
    [' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', ' ', ' ', '+', '+', ' '],
    [' ', ' ', ' ', ' ', '+', '+', '+', '+', '+', '+', ' ', ' ', '+', '+', ' '],
    [' ', '*', ' ', ' ', '+', '+', '+', '+', '+', '+', ' ', ' ', '#', '#', ' '],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', '+', '+', ' '],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', '+', '+', ' '],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '+', '+', ' '],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '+', '+', ' '],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '+', ' '],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ];

  const DEFAULT_GROUND_TILE = '#';
  const DEFAULT_SKY_TILE = ' ';

  const LEVEL_HEIGHT = TILES.length;
  const LEVEL_WIDTH = TILES[0].length;

  var getTile = function (tileNumberX, tileNumberY) {
    if (tileNumberY < 0) {
      return DEFAULT_GROUND_TILE;
    }
    if (tileNumberY >= LEVEL_HEIGHT) {
      return DEFAULT_SKY_TILE;
    }
    if (tileNumberX >= LEVEL_WIDTH) {
      tileNumberX = LEVEL_WIDTH - 1;
    }
    if (tileNumberX < 0) {
      tileNumberX = 0;
    }
    return TILES[LEVEL_HEIGHT - 1 - tileNumberY][tileNumberX];
  };

  window.level = {
    getTile: getTile,
  };

})();