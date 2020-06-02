var config = {
  type: Phaser.AUTO,
  width: 1280,
  height:  720,
  physics: {
    default: 'matter',
      matter: {
        debug: true
      }
  },
  scene: [mGame1,mGame2,mGame3]
};

var game = new Phaser.Game(config);
config.focus;

