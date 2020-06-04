class mGame1 extends Phaser.Scene {
    constructor() {
        super("game1");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
    }

	preload() {
        this.load.image("timebar", "Proto/timer.png");
        this.load.image("bar", "Proto/bar.png");
        this.load.image("barindicator", "Proto/blue.png");
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
	                	console.log("Vie :" + this.nVie);
	                    this.scene.start("game2", {nVie: this.nVie, score: this.score});
	                }
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

	    this.bar = this.add.sprite(30, 150, "bar").setOrigin(0,0).setScale();
	    this.barindicatorX = 30;
	    this.barindicatorY = 600;

	    if(this.gameTimer.paused == false)
	    {
	    	this.input.on('pointerdown', function (pointer, barindicator)
		    {	
		    	this.barindicatorY -= 10;
		    }, this);
	    }
	}

	update() {
		this.barindicator = this.add.sprite(this.barindicatorX,this.barindicatorY, "barindicator").setOrigin(0,0);

		if(this.barindicatorY <= 150)
		{
			this.gameTimer.paused = true;
			this.score++;
			console.log("Score :" + this.score);
			this.scene.start("game2", {nVie: this.nVie, score: this.score});
		}
	

	}
}