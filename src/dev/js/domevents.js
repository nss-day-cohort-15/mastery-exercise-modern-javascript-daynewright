
$(document).ready(function(){

  //get selections
  const playerName = $('#player-name').val();





  //get players
  const player = Arena.getRobotPlayer();
  const comp = Arena.getRobotComp();

  //populate dom
  const startingHealth = [player.health, comp.health];
  let buildDOM = ``;

  [player, comp].forEach((e,i) => {
    buildDOM += (
      `<div id="robot-${i}"class="col-md-6">
        <h1>${e.name}</h1>
        <img class="img-thumbnail img-responsive center-block" src="${e.type.image}">
        <h6>Health Bar: <progress value="${e.health}" max="${startingHealth[i]}"></progress></h6>
        <h4>Type: <span>${e.type.typeCategory}</span></h4>
        <h4> Model: <span>${e.type.name}</span></h4>
        <h4>Health: <span>${e.health}</span></h4>
        <h4>Weapon: <span>${e.weapon.name}</span></h4>
      </div>`)
  });


  $('#battle').html(buildDOM);
});
