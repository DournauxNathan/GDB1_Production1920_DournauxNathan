class goal extends Phaser.Scene {
    constructor() {
        super("goal");
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
		
		this.goal1 = this.add.image(440,250,'screengoal1').setVisible(false);
		this.goal2 = this.add.image(640,250,'screengoal2').setVisible(false);
		this.goal3 = this.add.image(840,250,'screengoal3').setVisible(false);

		this.timedEvent = this.time.delayedCall(3000, callGame, [], this);

		function callGame()
		{
			
			this.scene.start('game'+this.level, {nVie: this.nVie, score: this.score, level: this.level});
	
		}
		
	}

	update() {

		if(this.level == 1)
		{
			this.goal1.setVisible(true);
		}
		
		if(this.level == 2)
		{
			this.goal1.setVisible(false);
			this.goal2.setVisible(true);
		}

		if(this.level == 3)
		{
			this.goal3.setVisible(true);
			this.goal2.setVisible(false);
			this.goal1.setVisible(false);
		}
		
		
	}
}