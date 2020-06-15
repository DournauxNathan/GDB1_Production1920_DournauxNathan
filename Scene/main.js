class main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    init(data)
    {
        this.score = data.score;
        this.nVie = data.nVie;
        this.level = data.level;
    }

    preload() {
    }

    create() {
    	this.add.image(0, 0, 'title').setOrigin(0,0);

      	this.playButton = this.add.image(640, 460	, 'playButton').setInteractive();
	      this.galleryButton = this.add.image(1200, 650, 'galleryButton').setInteractive();
	      this.quitButton = this.add.image(640, 600, 'quitButton').setInteractive();

	      this.playButton.on('pointerdown',() => {
	          this.timedEvent = this.time.delayedCall(0, callGame, [], this);
	      })

	      this.playButton.on('pointerover',() => {
	          this.playButton.setScale(1.2, 1.2);
	      })

	      this.playButton.on('pointerout',() => {
	          this.playButton.setScale(1, 1);
	      })

	      this.galleryButton.on('pointerdown',() => {
	          this.timedEvent = this.time.delayedCall(0, callGallery, [], this);
	      })

	      this.galleryButton.on('pointerover',() => {
	          this.galleryButton.setScale(1.2, 1.2);
	      })

	      this.galleryButton.on('pointerout',() => {
	          this.galleryButton.setScale(1, 1);
	      })

	      this.quitButton.on('pointerdown',() => {
	          this.timedEvent = this.time.delayedCall(0, quitGame, [], this);
	      })

	      this.quitButton.on('pointerover',() => {
	          this.quitButton.setScale(1.2, 1.2);
	      })

	      this.quitButton.on('pointerout',() => {
	          this.quitButton.setScale(1, 1);
	      });

	      function callGame()
	      {
	          this.scene.start('game3', {nVie: this.nVie, score: this.score, level: this.level});


	          console.log("Vies :" + this.nVie);
	          console.log("Score :" + this.score);
	          console.log("Niveau :" + this.level);
	      }

	      function callGallery()
	      {
	          console.log("Gallery");
	      }

	      function quitGame()
	      {
	          this.scene.stop();
	          console.log("Game quitted");
	      }

    }

    update() {
    }
}
