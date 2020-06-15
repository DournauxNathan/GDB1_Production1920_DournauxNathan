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


        this.load.image("timebar", "Assets/timer.png");
        this.load.image("vie", "Assets/health.png");

        
        this.load.image("screengoal1", "Assets/ObjectiveScreen1.png");
        this.load.image("screengoal2", "Assets/ObjectiveScreen2.png");
        this.load.image("screengoal3", "Assets/ObjectiveScreen3.png");

    	this.load.image("background1-a", "Assets/background1-A.png");
        this.load.image("dirt", "Assets/dirt.png");
    	this.load.image("ostrishA", "Assets/OstrichA.png");
        this.load.image("ostrishB", "Assets/OstrichB.png");
    	this.load.image("barindicator", "Assets/barIndicator.png");
		this.load.image("bar", "Assets/bar.png");

		this.load.image("background2", "Assets/background2.png");
        this.load.image("ball", "Assets/Beetle.png");
        this.load.image("platform", "Assets/platform.png");


        this.load.image("background3", "Assets/background3.png");
        this.load.spritesheet("flies", "Assets/Fly.png", {frameWidth: 60, frameHeight: 44});

        this.load.image("chameleon", "Assets/chameleon.png");
        //this.load.image("tongue", "Assets/.png");

        this.load.image("pausedButton", "Assets/pauseButton.png");

        this.load.image("tongue", "Assets/blue.png");
        this.load.image("tongue", "Assets/blue.png");

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