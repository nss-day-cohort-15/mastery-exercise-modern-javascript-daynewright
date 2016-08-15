var Arena = (function(arena){
  arena.Arsonal = {};

  arena.Arsonal.Weapon = function(){
    this.name = null;
    this.damage = Math.floor(Math.random() * 50 + 10);
  };

//Drone attacks
  arena.Arsonal.FlyAttack = function(){
    this.name = 'Fly Attack';
    this.AllowedType = 'Drone';
    this.damage = this.damage + 18;
  };
  arena.Arsonal.FlyAttack.prototype = new arena.Arsonal.Weapon();

  arena.Arsonal.PropellerSlice = function(){
    this.name = 'Propeller Slice';
    this.AllowedType = 'Drone';
    this.damage = this.damage + 14;
  };
  arena.Arsonal.PropellerSlice.prototype = new arena.Arsonal.Weapon();

//Bipedal attacks
  arena.Arsonal.Punch = function(){
    this.name = 'Punch';
    this.AllowedType = 'Bipedal';
    this.damage = this.damage + 13;
  };
  arena.Arsonal.Punch.prototype = new arena.Arsonal.Weapon();

  arena.Arsonal.LazerBeams = function(){
    this.name = 'Lazer Beams';
    this.AllowedType = 'Bipedal';
    this.damage = this.damage + 19;
  };
  arena.Arsonal.LazerBeams.prototype = new arena.Arsonal.Weapon();

  //ATV attacks
    arena.Arsonal.Crush = function(){
      this.name = 'Crush';
      this.AllowedType = 'ATV';
      this.damage = this.damage + 12;
    };
    arena.Arsonal.Crush.prototype = new arena.Arsonal.Weapon();

    arena.Arsonal.JumpAttack = function(){
      this.name = 'Jump Attack';
      this.AllowedType = 'ATV';
      this.damage = this.damage + 17;
    };
    arena.Arsonal.JumpAttack.prototype = new arena.Arsonal.Weapon();


  return arena;

})(Arena || {});
