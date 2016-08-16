let Arena = (function(arena){

  let robotComp = new arena.Robots.Comp();
  let robotPlayer = new arena.Robots();

  //test function
  robotPlayer.type = new arena.Robots.OffRoadATV();
  robotPlayer.getWeapon('ATV');


  arena.getRobotComp = () => robotComp;
  arena.getRobotPlayer = () => robotPlayer;

  return arena;

})(Arena || {});
