var Arena = (function(arena){

  arena.Robots.Topio = function(){
    this.typeCategory = 'Bipedal';
    this.name = 'TOPIO';
    this.image = 'images/Topio.jpg';
    this.health = this.health + 25;
  };
  arena.Robots.Topio.prototype = new arena.Robots();

  arena.Robots.Nao = function(){
    this.typeCategory = 'Bipedal';
    this.name = 'Nao';
    this.image = 'images/Nao.jpg';
    this.health = this.health + 20;
  };
  arena.Robots.Nao.prototype = new arena.Robots();

  return arena;

})(Arena || {});
