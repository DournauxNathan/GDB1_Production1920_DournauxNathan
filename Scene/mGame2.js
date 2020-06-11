class mGame2 extends Phaser.Scene {
    constructor() {
        super("game2");
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

		this.add.image(0, 0, 'background2').setOrigin(0,0);

		//Timer
			let gameOptions = { initialTime: 600 }
			this.timeLeft = gameOptions.initialTime;
	        let timebar = this.add.sprite(0, 0, "timebar").setOrigin(0,0);

	        this.energyMask = this.add.sprite(timebar.x, timebar.y, "timebar").setOrigin(0,0);

	        this.energyMask.visible = false;
	 
	        timebar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

			this.gameTimer = this.time.addEvent({
	            delay: 10,
	            callback: function() {
	                this.timeLeft --;
	                let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;
	                this.energyMask.x -= stepWidth;
	                if(this.timeLeft == 0){
	                	this.level++;
						this.gameTimer.paused = true;
						this.score++;
						this.scene.start("issue", {nVie: this.nVie, score: this.score, level: this.level});
	                }
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

	    //Mettre en pause le jeu - 2 issues : Continue(retour au jeu) & Quitter(retour au menu principal)
		    this.pauseButton = this.add.sprite(1230,80, 'pausedButton').setInteractive();
		    this.resumeButton = this.add.sprite(440,360, 'resumeButton').setInteractive().setVisible(false);
		    this.quitButton = this.add.sprite(740,360, 'quitButton').setInteractive().setVisible(false);

		    this.pauseButton.on('pointerdown', () => {
		    	this.gameTimer.paused = true;
		    	this.player.destroy()
		    	this.resumeButton.setVisible(true);
				this.quitButton.setVisible(true);
		    });
		    this.resumeButton.on('pointerdown', () => {
		    	this.gameTimer.paused = false;
		    	this.player = this.matter.add.mouseSpring();
		    	this.resumeButton.setVisible(false);
				this.quitButton.setVisible(false);
		    });
		    this.quitButton.on('pointerdown', () => {
		    	this.gameTimer.paused = true;
		    	this.time.delayedCall(3000, () => {
		    		this.cameras.main.fade(0x000000, 1);
		    		this.scene.start("main");
		    	});
		    });  

	    //Contructors : Platforms [Working]
		    function Platforms(sprite, x, y,state, angle, here)
		    {
		    	this._platform = here.matter.add.image(x,y,sprite, null).setStatic(state).setAngle(angle).setScale(1.5,1).setVisible(false);
		    }

		    this.platformsLeft = new Platforms("platform", 300, 385, "true", 30, this);
	  		this.platformsRight = new Platforms("platform", 1000, 385, "true", -35, this);
	  		this.platforms = new Platforms("platform", 640, 750, "true", 0, this);	    

	    //Object - interaction with the player 
		    this.ballLeft = this.matter.add.image(150, 200, "ball")
		    	.setCircle(50)
			    .setFriction(10)
			    .setVelocityX(0)
			    .setAngularVelocity(0);
			    
	  		this.ballRight = this.matter.add.image(1000, 250, "ball")
		    	.setCircle(50)
			    .setFriction(10)
			    .setVelocityX(1)
			    .setAngularVelocity(0);

	  		this.player = this.matter.add.mouseSpring();
	}

	update() {
		//Fail condition
			if(this.ballLeft.y >= 650 || this.ballRight.y >= 650)
			{
				this.level++;
	        	this.nVie--;
	            this.scene.start("issue", {nVie: this.nVie, score: this.score, level: this.level})
			}
	}
}