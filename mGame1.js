class mGame1 extends Phaser.Scene {
    constructor() {
        super("game1");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
	    this.level = data.level;
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
	            },
	            callbackScope: this,
	            loop: true
	        });
	        this.gameTimer.paused = false;

	    this.bar = this.add.sprite(30, 150, "bar").setOrigin(0,0).setScale();
	    this.barindicatorX = 30;
	    this.barindicatorY = 600;

	    this.input.on('pointerdown', function (pointer, barindicator)
	    {	
	    	if(this.gameTimer.paused == false)
		    {
		    	this.barindicatorY -= 10;
		    }
	    }, this);

	    //Exemple de constructors : Boutons
		    /*
		    function PausedButtons(sprite, x, y, here,gameTimer)
		    {
		    	this._button = here.add.sprite(x,y,sprite).setInteractive();

		    	this._button.on('pointerover', () => {
		    		this._button.setTint(0xffffff)
		    	})

		    	this._button.on('pointerout', () => {
		    		this._sbuttonclearTint();
		    	})

		    	this._button.on('pointerdown', () => {
			    	this.gameTimer.paused = true;
			    });
		    }

		    function ResumeButtons(sprite, x, y, here)
		    {
		    	this._button = here.add.sprite(x,y,sprite).setInteractive();

		    	this._button.on('pointerover', () => {
		    		this._button.setTint(0xffffff)
		    	})

		    	this._button.on('pointerout', () => {
		    		this._button.clearTint();
		    	})

		    	this._button.on('pointerdown', () => {
			    	this.gameTimer.paused = false;
			    });
		    }

		    function ExitButtons(sprite, x, y, here)
		    {
		    	this._button = here.add.sprite(x,y,sprite).setInteractive();

		    	this._button.on('pointerover', () => {
		    		this._button.setTint(0xffffff)
		    	})

		    	this._button.on('pointerout', () => {
		    		this._button.clearTint();
		    	})

		    	this._button.on('pointerdown', () => {
			    	this.gameTimer.paused = pause;
			    });
		    }

		    this.pauseButton = new PausedButtons("pauseButton", 1230,80, this);
		    this.resumeButton = new ResumeButtons("resumeButton", 540,640, this);
		    this.quitButton = new ExitButtons("quitButton", 740,640, this);
			*/
		
		//Mettre en pause le jeu - 2 issues : Continue(retour au jeu) & Quitter(retour au menu principal)
		    this.pauseButton = this.add.sprite(1230,80, 'pausedButton').setInteractive();
		    this.resumeButton = this.add.sprite(440,360, 'resumeButton').setInteractive().setVisible(false);
		    this.quitButton = this.add.sprite(740,360, 'quitButton').setInteractive().setVisible(false);

		    this.pauseButton.on('pointerdown', () => {
		    	this.gameTimer.paused = true;
		    	this.resumeButton.setVisible(true);
				this.quitButton.setVisible(true);
		    });
		    this.resumeButton.on('pointerdown', () => {
		    	this.gameTimer.paused = false;
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
		this.barindicator = this.add.sprite(this.barindicatorX,this.barindicatorY, "barindicator").setOrigin(0,0);

		if(this.barindicatorY <= 150 && this.timeLeft != 0)
		{
			this.level++;
			this.gameTimer.paused = true;
			this.score++;
			this.scene.start("issue", {nVie: this.nVie, score: this.score, level: this.level});
		}

		if(this.timeLeft == 0){
			this.level++;
        	this.nVie--;
            this.scene.start("issue", {nVie: this.nVie, score: this.score, level: this.level});
        }
		
	}
}