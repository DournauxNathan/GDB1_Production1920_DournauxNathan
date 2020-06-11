class Transition extends Phaser.Scene {
    constructor() {
        super("issue");
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
		this.add.image(0, 0, 'transition').setOrigin(0,0);

		this.scoreText = this.add.text(640, 300, ' ', { fontSize: '35px', fill: '#fff' });
		this.scoreText.setText('' + this.score);

		this.vie1 = this.add.image(540,400,'3vie').setVisible(true);
		this.vie2 = this.add.image(640,400,'2vie').setVisible(true);
		this.vie3 = this.add.image(740,400,'1vie').setVisible(true);

		this.timedEvent = this.time.delayedCall(3000, callGame, [], this);

		function callGame()
		{
			console.log("Vies :" + this.nVie);
			console.log("Score :" + this.score);
			console.log("Niveau :" + this.level);
			
			if(this.level == 4)	
			{
				this.scene.start('main', {nVie: this.nVie, score: this.score, level: this.level});
			}
			else
			{
				this.scene.start('game'+ this.level, {nVie: this.nVie, score: this.score, level: this.level});
			}
		}
		
	}

	update() {

		if(this.nVie == 2)
		{
			this.vie3.setVisible(false);
		}
		
		if(this.nVie == 1)
		{
			this.vie3.setVisible(false);
			this.vie2.setVisible(false);
		}

		if(this.nVie == 0)
		{
			this.vie3.setVisible(false);
			this.vie2.setVisible(false);
			this.vie1.setVisible(false);
		}
		
		
	}
}