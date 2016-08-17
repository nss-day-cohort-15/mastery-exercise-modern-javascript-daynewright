let Arena = (function(arena){

  let robotComp = new arena.Robots.Comp();
  let robotPlayer = new arena.Robots();

  arena.getRobotComp = () => robotComp;
  arena.getRobotPlayer = () => robotPlayer;

  return arena;

})(Arena || {});
