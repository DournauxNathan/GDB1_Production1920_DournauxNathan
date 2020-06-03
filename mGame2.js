class mGame2 extends Phaser.Scene {
    constructor() {
        super("game2");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
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
	                	this.score++;
	                	console.log(this.score);
	                    this.scene.start("game3", {nVie: this.nombreVie, score: this.score})
	                }
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

	    function Balls(sprite, x, y, radius, fric, velX, AngVel, here)
	    {
	    	this._ball = here.matter.add.image(x, y, sprite)
	    	.setCircle(radius)
		    .setFriction(fric)
		    .setVelocityX(velX)
		    .setAngularVelocity(AngVel);

		    here.matter.add.mouseSpring();
	    }

	    function Platforms(sprite, x, y,state, angle, here)
	    {
	    	this._platform = here.matter.add.image(x,y,sprite, null, {isStatic: state}).setAngle(angle);
	    }

	    function OnTrigger(sprite, x, y, state, here)
  		{
  			this._trigger = here.matter.add.image(x,y,sprite, null, {isStatic: state}).setVisible(false);
  		}

	    this.ballLeft = new Balls("ball", 150, 250, 50, 0, 1, 0, this);
  		this.ballRight = new Balls("ball", 1000, 250, 50, 0, 1, 0, this);

	    this.platformsLeft = new Platforms("platform", 250, 450, "true", 8, this);
  		this.platformsRight = new Platforms("platform", 1000, 450, "true", -8, this);

  		this.trigger = new OnTrigger("trigger", 640,700,"true", this);

	    /*this.gameTimer.paused = true;
    	this.nVie--;
    	console.log(this.nVie);
        this.scene.start("Fails", {nVie: this.nombreVie, score: this.score});

        this.score++;
        	console.log(this.score);
            this.scene.start("Win", {nVie: this.nombreVie, score: this.score})
        */

		
	    
	}

	update() {


		
	}
}