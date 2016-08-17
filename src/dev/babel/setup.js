"use strict";

var Arena = function (arena) {

  var robotComp = new arena.Robots.Comp();
  var robotPlayer = new arena.Robots();

  arena.getRobotComp = function () {
    return robotComp;
  };
  arena.getRobotPlayer = function () {
    return robotPlayer;
  };

  return arena;
}(Arena || {});