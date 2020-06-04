class mGame3 extends Phaser.Scene {
    constructor() {
        super("game3");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
    }

	preload() {
		this.load.image("timebar", "Proto/timer.png");
        this.load.image("flies", "Proto/red.png");

        this.load.image("tongue", "Proto/blue.png");

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
    
    
	    this.nTargets = 3;
	    this.speedTargets = 5000;
	    this.targetA = this.matter.add.image(850,550,"flies", {label: "1"}).setStatic(true).setOnCollide(collectTarget);
	    this.targetB = this.matter.add.image(1400,200,"flies", {label: "2"}).setStatic(true).setOnCollide(collectTarget);
	    this.targetC = this.matter.add.image(1100,550,"flies", {label: "3"}).setStatic(true).setOnCollide(collectTarget);

	    this.tweenA = this.tweens.add({
	        targets: this.targetA,
	        y: 200,
	        duration: this.speedTargets,
	        ease: 'Linear',
	        loop: -1,
	        yoyo: true
	    });

	    this.tweenB = this.tweens.add({
	        targets: [ this.targetB ],
	        x: 1100,
	        duration: this.speedTargets,
	        ease: 'Linear',
	        loop: -1,
	        yoyo: true
	    });

	    this.tweenC = this.tweens.add({
	        targets: [ this.targetC ],
	        x: 1400,
	        duration: this.speedTargets,
	        ease: 'Linear',
	        loop: -1,
	        yoyo: true
	    });

	    this.body1 = this.matter.add.sprite(250, 550,'tongue').setOnCollide(collectTarget); 
	    this.matter.add.mouseSpring();
	    this.body2 = this.matter.add.rectangle(250, 550, 30, 30, { isStatic: true });
	    this.body3 = this.matter.add.rectangle(250, 650, -200, 500, { isStatic: true });
	    this.body4 = this.matter.add.rectangle(250, 700, 500, 200, { isStatic: true });

	    this.matter.add.spring(this.body1, this.body2, 100, 0.001);

	   
	    this.spring = this.matter.add.spring(this.body1, this.body2, 140, 0.001);


	    function collectTarget()
	    {
	    	console.log("collected")
	    }

  	    
	}

	update() {

				

	}
}