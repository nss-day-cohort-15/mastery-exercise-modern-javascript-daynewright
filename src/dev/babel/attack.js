'use strict';

var Arena = function (arena) {

  arena.Robots.prototype.attack = function (enemyObj) {
    var randomDamage = Math.ceil(Math.random() * this.weapon.damage);
    enemyObj.health = enemyObj.health - randomDamage;

    var enemyId = this === arena.getRobotPlayer() ? 1 : 0;

    arena.buildDomElements();

    var $health = $('#health-' + enemyId);
    var $image = $('#image-' + enemyId);

    $($health[0]).addClass('flash');
    $($image[0]).addClass('shake');

    swal({
      title: this.name + ' attacks!',
      html: '<span class="bold">' + enemyObj.name + '</span> was attacked <br />by <span class="bold">' + this.name + '</span> with <span class="bold">' + this.weapon.name + '</span><br />causing <span class="red bold">' + randomDamage + ' damage</span>!',
      type: "warning",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000
    });

    if (arena.getRobotPlayer().health <= 0) {
      youLose();
    }
    if (arena.getRobotComp().health <= 0) {
      youWin();
    }
  };

  function youWin() {
    swal({
      title: "You Win!",
      text: "Your robot lives to fight another day!",
      type: "success",
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });
  }

  function youLose() {
    swal({
      title: "You lose!",
      text: "Oh no...Your robot is no more!",
      type: "error",
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });
  }

  return arena;
}(Arena || {});