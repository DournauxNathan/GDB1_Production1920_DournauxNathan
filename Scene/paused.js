class paused extends Phaser.Scene {
    constructor() {
        super("paused");
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
		    this.resumeButton = this.add.sprite(440,360, 'resumeButton').setInteractive();
		    this.quitButton = this.add.sprite(740,360, 'quitButton').setInteractive();

		    this.resumeButton.on('pointerdown', () => {
    			this.scene.stop();
				this.scene.resume('game'+this.level);


	            console.log('game1 resumed');
	       
		    });
		    this.quitButton.on('pointerdown', () => {
		    	this.scene.stop();
				this.scene.stop('game1') ;
				this.scene.start('main');
		    });
		}

	update() {
		
		
	}
}