class load extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
    }

	preload() {

	}

	create() {
		this.nVie = 3;
		this.score = 0;

		this.timedEvent = this.time.delayedCall(0, callChangeScene, [], this);

		function callChangeScene()
		{
			console.log(this.nVie);	
			console.log(this.score);	
			this.scene.start('game1', {nVie: this.nVie, score: this.score});


		}
		
	}

	update() {
		

	}
}