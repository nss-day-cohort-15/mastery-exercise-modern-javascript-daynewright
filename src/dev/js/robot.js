var Arena = (function(arena){
  arena.Robots = {};

  arena.Robots = function(){
    this.types = ['OffRoadATV', 'TankATV', 'Topio', 'Nao', 'PhoneDrone', 'ParrotDrone'];
    this.weapon = null;
    this.health = Math.floor(Math.random() * 50 + 10);
    this.name = `Robot ${Math.floor(Math.random() * 500 + 100)}`;
  };


  arena.Robots.prototype.randomType = function(){
    var random = Math.round(Math.random()* (this.types.length -1));
    var randomType = this.types[random];

    this.type = new arena.Robots[randomType]();

    return this.type;
  };

  arena.Robots.prototype.getWeapon = function(type){

    var weaponTypes = {
      'Drone': { 0: 'FlyAttack', 1: 'PropellerSlice'},
      'Bipedal': {0:'Punch', 1:'LazerBeams'},
      'ATV': {0:'Crush', 1:'JumpAttack'}
    };
    var selectedWeapon = weaponTypes[type][Math.floor(Math.random() * 2)];

    this.weapon = new arena.Arsonal[selectedWeapon]();
    return this.weapon;
  };

  arena.Robots.Comp = function(){
    var names = ['Gearz','Ogo','Bracer','Ikegroid','Scyther', 'Olonroid', 'Cylinder', 'Epiytron'];
    var name = names[Math.floor(Math.random() * names.length)];

    this.name = name;
    this.type = this.randomType();
    this.weapon = this.getWeapon(this.type.typeCategory);
  };
  arena.Robots.Comp.prototype = new arena.Robots();

  // arena.Robots.prototype.attack = (enemyRobot) => {
  //   //define attack functionality
  // };

  return arena;

})(Arena || {});
