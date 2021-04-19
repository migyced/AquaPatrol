class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('submarine', './assets/submarine.png');
        //this.load.image('octopus', './assets/octopus.png');
        //load spritesheet
        this.load.spritesheet('explosion','./assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});// sets explosion order from frame 0 to frame 9 & defines the dimensions of a frame
        
    }

    create(){
        //place tiel sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0x000000, 0.2).setOrigin(0, 0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.text(game.config.width/2, )
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0,0);
        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.sub = new Submarine(this, game.config.width - borderUISize*3, borderUISize*4, 'submarine', 0, 50).setOrigin(0,0);
        //define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        //initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'black',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        //60 - second play clock
        scoreConfig.fixedWidth = 0;
        //game over flag
        this.gameOver = false;
        
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=>{
            this.add.rectangle(0,0,game.config.width *2, game.config.height*2, 'black',  0.5);
            this.add.text(game.config.width/2, game.config.height/3, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene');
        }
        this.starfield.tilePositionX -=2;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.sub.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode1(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode1(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode1(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.sub)){
            this.p1Rocket.reset();
            this.shipExplode1(this.sub);
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship. width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            }else{
                return false;
            }
    }

    shipExplode1(ship){
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); //play explode animation
        boom.on('animationcomplete', () =>{ //callback after anim completes
            ship.reset(); //reset ship position
            ship.alpha = 1; //make ship visible again
            boom.destroy(); // remove explosion sprite
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
    
}