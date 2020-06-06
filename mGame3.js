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
	                	this.level++;
			        	this.nVie--;
			            this.scene.start("issue", {nVie: this.nVie, score: this.score, level: this.level})
	                }
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;
   
	    //Exemple de constructors : Objets et Tweens
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

			new Tweens("this.targetA", "y", 200, 500, "true",this);
		    new Tweens("this.targetB", "x", 1100, 500, "true",this);
		    new Tweens("this.targetC", "x", 1400, 500, "true",this);
		    */

	    this.nTargets = 3;
	    this.speedTargets = 5000;

	    this.targetA = this.matter.add.image(850,550,"flies").setStatic(true);
	    this.targetB = this.matter.add.image(1400,200,"flies").setStatic(true);
	    this.targetC = this.matter.add.image(1100,550,"flies").setStatic(true);

	    //Tagets' Animations
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

        this.body1 = this.matter.add.sprite(250, 550,'tongue').setOnCollideWith(this.targetA, this.collectTargetA).setOnCollideWith(this.targetB, this.collectTargetB).setOnCollideWith(this.targetC, this.collectTargetC); 
		this.player = this.matter.add.mouseSpring();
		this.body2 = this.matter.add.rectangle(250, 550, 30, 30, { isStatic: true });
	    this.body3 = this.matter.add.rectangle(250, 650, -200, 800, { isStatic: true });
	    this.body4 = this.matter.add.rectangle(250, 700, 500, 200, { isStatic: true });
        this.matter.add.spring(this.body1, this.body2, 100, 0.001);

        this.body3.render.visible = false;
        this.body4.render.visible = false;

	    this.spring = this.matter.add.spring(this.body1, this.body2, 140, 0.001);  	  

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
	}

	update() {

	}
}