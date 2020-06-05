var config = {
  type: Phaser.AUTO,
  width: 1280,
  height:  720,
  physics: {
    default: 'matter',
      matter: {
        gravity: { y: 0 },
        debug: true
      }
  },
  scene: [load, mGame3]
};

var game = new Phaser.Game(config);

