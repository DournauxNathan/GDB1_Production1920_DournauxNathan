class mGame3 extends Phaser.Scene {
    constructor() {
        super("game3");
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

		this.add.image(0, 0, 'background3').setOrigin(0,0);

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
	                	
			            this.timedEvent = this.time.delayedCall(2000, callGame, [], this);

			            function callGame()
						{
							this.level = Phaser.Math.Between(1,3);
			        		this.nVie--;
			 
							this.scene.start("main", {nVie: this.nVie, score: this.score, level: this.level});
						}
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
		    	this.tweenA.pause();
		    	this.tweenB.pause();
		    	this.tweenC.pause();
		    	this.player.destroy()

		    	this.resumeButton.setVisible(true);
				this.quitButton.setVisible(true);
		    });
		    this.resumeButton.on('pointerdown', () => {
		    	this.gameTimer.paused = false;
		    	this.player = this.matter.add.mouseSpring();
		    	this.tweenA.resume();
		    	this.tweenB.resume();
		    	this.tweenC.resume();
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

	    //Constructors : Objects et Tweens [Not working]
	    	/*function Targets(sprite, x, y, state,here)
		    {
		    	this._target = here.matter.add.image(x,y,sprite).setStatic(state);	
		    }

		    function Tweens(object, axis, posXY, duration, state, here)
		    {
		    	here.tweens.add({
			        targets: object,
			        axis: posXY,
			        duration: duration,
			        ease: 'Linear',
			        loop: -1,
			        yoyo: state
			    });
		    }

		   	this.targetA = new Targets("flies", 850, 550, "true", this);
		    this.targetB = new Targets("flies", 1400, 200, "true", this);
		    this.targetC = new Targets("flies", 1100, 550, "true", this);



		   	this.targetA = new Targets("flies", 850, 550, "true", this);
		    this.targetB = new Targets("flies", 1400, 200, "true", this);
		    this.targetC = new Targets("flies", 1100, 550, "true", this);

			new Tweens("this.targetA", "y", 200, 500, "true",this);
		    new Tweens("this.targetB", "x", 1100, 500, "true",this);
		    new Tweens("this.targetC", "x", 1400, 500, "true",this);
		    */

		//Object - Target
		    this.nTargets = 3;
		    this.speedTargets = 5000;


		    this.targetA = this.matter.add.sprite(850,550,"flies").setStatic(true);
		    this.targetB = this.matter.add.sprite(1400,200,"flies").setStatic(true);
		    this.targetC = this.matter.add.sprite(1100,550,"flies").setStatic(true);

		    //Tagets' Animations
		    	this.anims.create({
					key:'flyAnim',
					frames: this.anims.generateFrameNumbers('flies', {rupeet: 0, end: 3}),
					frameRate: 18,
					repeat: -1
				});

				/*this.targetA.play('flyAnim', true);
				this.targetB.play('flyAnim', true);
				this.targetC.play('flyAnim', true);*/

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

		    this.collectTargetA = function(targetA)
	        {
	            targetA.destroy(true);	
	        }

	        this.collectTargetB = function(targetB)
	        {
	        	targetB.destroy();
	        }

	        this.collectTargetC = function(targetC)
	        {
	            targetC.destroy(); 
	        }

	       

		this.block = this.matter.add.image(400, 50, 'chameleon', null, { ignoreGravity: true });
	    this.block.setFixedRotation();
	    this.block.body.allowGravity = false;

	    var y = 150;
	    var prev = this.block;

	    for (var i = 0; i < 5; i++)
	    {
	        var ball = this.matter.add.image(400, y, '', null, { shape: 'circle', mass: 0.1 }).setOnCollideWith(this.targetA, this.collectTargetA).setOnCollideWith(this.targetB, this.collectTargetB).setOnCollideWith(this.targetC, this.collectTargetC);

	        this.matter.add.joint(prev, ball, (i === 0) ? 90 : 35, 0.4);

	        prev = ball;

	        y += 18;
	    }
	    this.matter.add.mouseSpring();
	}

	update() {
		this.block.x = 400;
		this.block.y = 50;

		/*if(this.targetA.y >= 200)
	    {
	    	this.targetA.setFlipX(true);
	    }

	    if(this.targetA.y <= 550)
	    {
	    	this.targetA.setFlipX(true);
	    }

	    if(this.targetB.x >= 1100)
	    {
	    	this.targetB.setFlipX(true);
	    }

	    if(this.targetB.x <= 1400)
	    {
	    	this.targetB.setFlipX(false);
	    }

	    if(this.targetB.x >= 1400)
	    {
	    	this.targetC.setFlipX(true);
	    }

	    if(this.targetB.x <= 1100)
	    {
	    	this.targetC.setFlipX(true);
	    }	*/	

	}
}