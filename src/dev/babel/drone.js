'use strict';

var Arena = function (arena) {

  arena.Robots.PhoneDrone = function () {
    this.typeCategory = 'Drone';
    this.name = 'Phone Drone';
    this.image = 'images/PhoneDrone.jpg';
    this.health = this.health + 35;
  };
  arena.Robots.PhoneDrone.prototype = new arena.Robots();

  arena.Robots.ParrotDrone = function () {
    this.typeCategory = 'Drone';
    this.name = 'Parrot Drone';
    this.image = 'images/ParrotDrone.jpg';
    this.health = this.health + 37;
  };
  arena.Robots.ParrotDrone.prototype = new arena.Robots();

  return arena;
}(Arena || {});