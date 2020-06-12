var config = {
  type: Phaser.AUTO,
  width: 1280,
  height:  720,
  backgroundColor: "#fff",
  physics: {
    default: 'matter',
      matter: {
        debug: true
      }
  },
  scene: [ load,main, Transition, paused, goal, mGame1, mGame2, mGame3]
};

var game = new Phaser.Game(config);

