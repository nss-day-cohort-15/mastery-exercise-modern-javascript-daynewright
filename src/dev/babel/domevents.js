'use strict';

var Arena = function (arena) {

  $(document).ready(function () {

    //get players
    var player = arena.getRobotPlayer();
    var comp = arena.getRobotComp();
    var startingHealth = [player.health, comp.health];

    //get selections
    var $playerName = $('#player-name');
    var $playerRobot = $('select');
    var $createPlayer = $('#create-player');
    var $attack = $('#attack');
    var $sections = $('section');

    toggleSections($sections[1], $sections[0]);

    $playerRobot.change(getWeapons);

    // START:Add weapon options //
    function getWeapons() {
      var split = $playerRobot[0].value.split('-');

      var weaponHTML = '';
      switch (split[1]) {
        case 'ATV':
          weaponHTML += addOptions(['Crush', 'Jump Attack']);
          break;
        case 'Bipedal':
          weaponHTML += addOptions(['Punch', 'Lazer Beams']);
          break;
        case 'Drone':
          weaponHTML += addOptions(['Fly Attack', 'Propeller Slice']);
          break;
      }
      $($playerRobot[1]).html(weaponHTML);
      player.setType(split[0]);
    }

    function addOptions(valueArray) {
      var holder = '';
      valueArray.forEach(function (e) {
        holder += '<option value="' + e.replace(/\W/g, '') + '">' + e + '</option>';
      });
      return holder;
    }
    // END:Add weapon options //

    $createPlayer.click(populateBattle);

    // START:Populate battle sections //
    function populateBattle(evt) {
      evt.preventDefault();

      if ($playerName.val() === "") {
        return swal("Oops!", "You must name your robot to fight!", "error");
      }
      if (!$playerRobot[1].value) {
        return swal("Oops!", "You must select a type of robot to fight!", "error");
      }

      player.name = $playerName.val();
      player.getWeapon(null, $playerRobot[1].value);

      arena.buildDomElements();

      toggleSections($sections[0], $sections[1]);
    }
    // END:Populate battle sections //

    $attack.click(attackRobots);

    function attackRobots(evt) {
      evt.preventDefault();
      $(this).prop('disabled', true);
      player.attack(comp);

      if (comp.health >= 0 && player.health >= 0) {
        setTimeout(function () {
          comp.attack(player);
          $('#attack').prop('disabled', false);
        }, 3000);
      }
    }

    function toggleSections(hide, show) {
      $(hide).hide();
      $(show).show();
    }

    arena.buildDomElements = function () {
      player.name = $playerName.val();
      player.getWeapon(null, $playerRobot[1].value);

      var buildDOM = '';
      [player, comp].forEach(function (e, i) {
        buildDOM += '<div id="robot-' + i + '"class="col-md-6">\n            <h1>' + e.name + '</h1>\n            <img id="image-' + i + '" class="img-thumbnail img-responsive center-block" src="' + e.type.image + '">\n            <h6>Health Bar: <progress value="' + e.health + '" max="' + startingHealth[i] + '"></progress></h6>\n            <h4>Type: <span>' + e.type.typeCategory + '</span></h4>\n            <h4> Model: <span>' + e.type.name + '</span></h4>\n            <h4>Health: <span id="health-' + i + '"">' + e.health + '</span></h4>\n            <h4>Weapon: <span>' + e.weapon.name + '</span></h4>\n          </div>';
      });

      $('#battle').html(buildDOM);
    };
  });
}(Arena || {});