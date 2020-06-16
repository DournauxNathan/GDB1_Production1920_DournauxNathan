class mGame4 extends Phaser.Scene {
    constructor() {
        super("game4");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
	    this.level = data.level;	
    }

	preload() {
		this.load.image("timebar", "Proto/timer.png");
        this.load.image("target", "Proto/red.png");

        this.load.image("blue", "Proto/blue.png");

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
	                	this.nVie--;
	                	console.log("Vies : " + this.nVie);
	                   // this.scene.start("Fails", {nVie: this.nombreVie, score: this.score});
	                }
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

	    this.timedEvent = this.time.addEvent({ delay: 1500, callback: onEvent, callbackScope: this, loop: true });

	    function Targets(sprite, x, y, here)
	    {
	    	this._target = here.physics.add.image(x,y,sprite);

	    	this.tween = here.tweens.add({
		        targets: this._target,
		        x: 350,
		        duration: 5000,
		        ease: 'Linear',
	    	});
	    }

	   
	    this.body1 = this.physics.add.sprite(350, 360, "blue");

	    function onEvent ()
		{
			this.target = new Targets('target',1200,360, this);
			this.physics.add.overlap(this.target, this.body1, destroyTargets, null,this);

			if(this.target.x == 350)
    	{
    		this.target.destroy();
    		console.log("Yay")
    	}

		}

		function destroyTargets()
	    {	
	    	console.log("Yay")
			this.target.destroy(true);
	    }

	}

	update() {

		if( this.input.activePointer.isDown ){
       	    
			open = true;

			if(open	)
			{
				console.log("Yay")
			}
		}		

	}
}