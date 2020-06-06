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
        this.load.image("timebar", "Proto/timer.png");
        this.load.image("ball", "Proto/blue.png");
        this.load.image("platform", "Proto/platform.png");
        this.load.image("trigger", "Proto/trigger.png");
	}

	create() {
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

	    function Platforms(sprite, x, y,state, angle, here)
	    {
	    	this._platform = here.matter.	add.image(x,y,sprite, null).setStatic(state).setAngle(angle);
	    }

	    this.ballLeft = this.matter.add.image(150, 250, "ball")
	    	.setCircle(50)
		    .setFriction(0)
		    .setVelocityX(1)
		    .setAngularVelocity(0);
		    
  		this.ballRight = this.matter.add.image(1000, 250, "ball")
	    	.setCircle(50)
		    .setFriction(0)
		    .setVelocityX(1)
		    .setAngularVelocity(0);

		this.matter.add.mouseSpring();

	    this.platformsLeft = new Platforms("platform", 250, 450, "true", 8, this);
  		this.platformsRight = new Platforms("platform", 1000, 450, "true", -8, this);
  		this.platforms = new Platforms("platform", 640, 750, "true", 0, this);	    

  		this.matter.add.mouseSpring();
	}

	update() {

		if(this.ballLeft.y >= 650 || this.ballRight.y >= 650)
		{
			this.level++;
        	this.nVie--;
            this.scene.start("issue", {nVie: this.nVie, score: this.score, level: this.level})
		}

	}
}