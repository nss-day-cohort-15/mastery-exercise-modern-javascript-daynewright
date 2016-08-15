var Arena = (function(arena){

  var robotComp = new arena.Robots.Comp();

  var robotPlayer = new arena.Robots();

  console.log(robotComp);
  console.log(robotPlayer);

  arena.getRobotComp = () => robotComp;

  return arena;

})(Arena || {});
