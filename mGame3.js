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
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

		function Targets(sprite, x ,y, here)
		{
			this._target = here.matter.add.sprite(x,y,sprite);
		}

		this.targetA = new Targets("flies", 700, 250, this, {ignoreGravity: true});
		let tween = this.tweens.add({
		        targets: this.targetA,
		        x: 1100,
		        duration: 3000,
		        ease: 'Power2',
		        loop: 2
		    });  


		var image = this.add.image(100, 300, 'flies');

		this.matter.world.setBounds();

        this.body1 = this.matter.add.circle(250, 500, 30, { isStatic: true });
   
        this.body2 = this.matter.add.rectangle(150, 250, 30,30);

        this.matter.add.spring(this.body1, this.body2, 10, 0.001);

	    this.matter.add.mouseSpring();

	    

	}

	update() {

	}
}