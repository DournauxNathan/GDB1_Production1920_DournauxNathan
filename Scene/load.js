class load extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
	    this.level = data.level;
    }

	preload() {
		this.load.image("title", "Assets/mainTitle.png");
		this.load.image("transition", "Assets/transition.png");
    	this.load.image("playButton", "Assets/playButton.png");
    	this.load.image("quitButton", "Assets/quitButton.png");


        this.load.image("timebar", "Proto/timer.png");

    	this.load.image("background1-a", "Assets/background1-A.png");
    	this.load.image("background1-b", "Assets/background1-B.png");
    	this.load.image("barindicator", "Assets/barIndicator.png");
		this.load.image("bar", "Assets/bar.png");

		this.load.image("background2", "Assets/background2.png");
        this.load.image("ball", "Proto/blue.png");
        this.load.image("platform", "Proto/platform.png");
        this.load.image("trigger", "Proto/trigger.png");


        this.load.image("background3", "Assets/background3.png");
        this.load.spritesheet("flies", "Assets/fly.png", {frameWidth: 60, frameHeight: 44});

        this.load.image("tongue", "Proto/blue.png");

        this.load.image("pausedButton", "Assets/pauseButton.png");

        this.load.image("tongue", "Proto/blue.png");
        this.load.image("tongue", "Proto/blue.png");

	}

	create() {
		this.nVie = 3;
		this.score = 0;
		this.level = 1;

		this.timedEvent = this.time.delayedCall(0, callChangeScene, [], this);

		function callChangeScene()
		{	
			this.scene.start('main', {nVie: this.nVie, score: this.score, level: this.level});
		}
		
	}

	update() {
		console.log("Vies :" + this.nVie);
		console.log("Score :" + this.score);
		console.log("Niveau :" + this.level);	
	

	}
}