class Win extends Phaser.Scene {
    constructor() {
        super("win");
    }

    init(data)
    {
    	this.score = data.score;
	    this.nVie = data.nVie;
    }

	preload() {
        
	}

	create() {
		this.scoreText = this.add.text(640, 360, ' ', { fontSize: '35px', fill: '#fff' });
		this.scoreText.setText('' + this.this.score);

		this.vie3 = this.add.image(640,500,'3vie');
		this.vie2 = this.add.image(640,500,'2vie');
		this.vie1 = this.add.image(640,500,'1vie');
		
		
	}

	update() {

	
		
	}
}