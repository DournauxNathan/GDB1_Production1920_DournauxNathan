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
	            callback: function(){
	                this.timeLeft --;
	                let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;
	                this.energyMask.x -= stepWidth;
	                if(this.timeLeft == 0){
	                	this.nVie--;
	                	console.log(this.nVie);
	                    this.scene.start("Fails", {nVie: this.nombreVie, score: this.score})
	                }
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

	   	
	    this.balls = this.matter.add.image(400, 100, 'blue', null, { chamfer: 16 }).setBounce(0.9).setIgnoreGravity(true);
	    this.balls.setBody({
        type: 'circle',
        radius: 48
    	});
	    this.balls = this.matter.add.mouseSpring({ length: 1, stiffness: 0.6 });

	   	

	    this.platform =  this.matter.add.image(400, 550, 'timebar', null, { isStatic: true }).setAngle(45);

	    this
	    
		

		
	}

	update() {
		
		
	}
}