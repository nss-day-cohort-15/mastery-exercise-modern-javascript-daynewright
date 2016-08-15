
$(document).ready(function(){

  var comp = Arena.getRobotComp();


  var buildDOM = (
    `<h1>${comp.name}</h1>
      <div><img src="${comp.type.image}"></div>
    <progress value="${comp.health}" max="${comp.health}"></progress>
    <h4>Type: <span>${comp.type.typeCategory}</span></h4>
    <h4> Name: <span>${comp.type.name}</span></h4>
    <h4>Health: <span>${comp.health}</span></h4>
    <h4>Weapon: <span>${comp.weapon.name}</span></h4>`
  );


  $('#comp-robot').html(buildDOM);
});
