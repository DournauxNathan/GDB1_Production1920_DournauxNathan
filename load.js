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

	}

	create() {
		this.nVie = 3;
		this.score = 0;
		this.level = 1;

		this.timedEvent = this.time.delayedCall(0, callChangeScene, [], this);

		function callChangeScene()
		{	
			this.scene.start('game'+this.level, {nVie: this.nVie, score: this.score, level: this.level});
		}
		
	}

	update() {
		console.log("Vies :" + this.nVie);
		console.log("Score :" + this.score);
		console.log("Niveau :" + this.level);	
	

	}
}