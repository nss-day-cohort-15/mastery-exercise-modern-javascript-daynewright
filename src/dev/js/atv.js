var Arena = (function(arena){

  arena.Robots.OffRoadATV = function(){
    this.typeCategory = 'ATV';
    this.name = 'OffRoad ATV';
    this.image = 'images/OffRoadATV.jpg';
    this.health = this.health + 38;
  };
  arena.Robots.OffRoadATV.prototype = new arena.Robots();

  arena.Robots.TankATV = function(){
    this.typeCategory = 'Drone';
    this.name = 'Tank ATV';
    this.image = 'images/TankATV.jpg';
    this.health = this.health + 37;
  };
  arena.Robots.ParrotDrone.prototype = new arena.Robots();

  return arena;

})(Arena || {});
