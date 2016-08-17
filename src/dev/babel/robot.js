'use strict';

var Arena = function (arena) {
  arena.Robots = {};

  arena.Robots = function () {
    this.types = ['OffRoadATV', 'TankATV', 'Topio', 'Nao', 'PhoneDrone', 'ParrotDrone'];
    this.weapon = null;
    this.health = Math.floor(Math.random() * 50 + 100);
    this.name = 'Robot ' + Math.floor(Math.random() * 500 + 100);
  };

  arena.Robots.prototype.setType = function (type) {
    if (!type) {
      var random = Math.round(Math.random() * (this.types.length - 1));
      type = this.types[random];
    }
    this.type = new arena.Robots[type]();

    return this.type;
  };

  arena.Robots.prototype.getWeapon = function (type, selectedWeapon) {
    if (type !== null) {
      var weaponTypes = {
        'Drone': { 0: 'FlyAttack', 1: 'PropellerSlice' },
        'Bipedal': { 0: 'Punch', 1: 'LazerBeams' },
        'ATV': { 0: 'Crush', 1: 'JumpAttack' }
      };
      selectedWeapon = weaponTypes[type][Math.floor(Math.random() * 2)];
    }
    this.weapon = new arena.Arsonal[selectedWeapon]();

    console.log(this);

    return this.weapon;
  };

  arena.Robots.Comp = function () {
    var names = ['Gearz', 'Ogo', 'Bracer', 'Ikegroid', 'Scyther', 'Olonroid', 'Cylinder', 'Epiytron'];
    var name = names[Math.floor(Math.random() * names.length)];

    this.name = name;
    this.type = this.setType();
    this.weapon = this.getWeapon(this.type.typeCategory);
  };
  arena.Robots.Comp.prototype = new arena.Robots();

  return arena;
}(Arena || {});