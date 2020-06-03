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
	                	console.log(this.nVie);
	                    this.scene.start("Fails", {nVie: this.nombreVie, score: this.score})
	                }
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

	function Targets(sprite, x ,y, here)
    {
        this._target = here.matter.add.image(x,y,sprite).setStatic(true);

    }
	this.nTargets = 3;
    this.targetA = new Targets("flies", 850, 550, this);
    this.targetB = new Targets("flies", 1100, 200, this);
    this.targetC = new Targets("flies", 1100, 550, this);

    
    
    this.body1 = this.matter.add.image(250, 550, 'tongue'); 
    this.body2 = this.matter.add.image(250, 550, 'tongue');

    this.matter.add.spring(this.body1, this.body2, 1, 0.001);

    this.cat1 = this.matter.world.nextCategory();

    this.body1.setCollisionCategory(this.cat1);

    this.matter.world.on('collisionstart', function (event) {
		event.pairs[0].bodyA.gameObject.destroy();
    });

	this.matter.add.mouseSpring();
	    
	}

	update() {
		

	}
}