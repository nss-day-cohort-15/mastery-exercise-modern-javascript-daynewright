describe("The app should have these:", function () {

  it("an Arena global variable", function () {
    expect(Arena).toBeDefined();
  });

  it("a constructor to build a robot", function () {
    expect(Arena.Robots).toBeDefined();
  });

  it("an attack prototype method", function () {
    expect(Arena.Robots.prototype.attack).toBeDefined();
  });
});

describe("A Player Robot should return these:", function () {
  var robot = new Arena.Robots();
      robot.type = robot.setType('OffRoadATV');
      robot.weapon = robot.getWeapon(null, 'Crush');

  var comp = new Arena.Robots.Comp();

  it('a robot is created', function(){
    expect(robot).toBeDefined();
  });

  it("a robot should have a name", function () {
    expect(robot.name).toBeDefined();
  });

  it("a robot should have health", function () {
    expect(robot.health).toBeDefined();
  });

  it("a robot should have a weapon", function () {
    expect(robot.weapon).toBeDefined();
  });
});

describe("A Computer Robot should return these:", function () {
  var comp = new Arena.Robots.Comp();

  it('a computer robot is created', function(){
    expect(comp).toBeDefined();
  });

  it("a computer robot should have a name", function () {
    expect(comp.name).toBeDefined();
  });

  it("a computer robot should have health", function () {
    expect(comp.health).toBeDefined();
  });

  it("a computer robot should have a weapon", function () {
    expect(comp.weapon).toBeDefined();
  });
});
