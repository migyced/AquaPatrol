class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        //menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '55px',
            backgroundColor: '#0081FA',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //show background color
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x0081FA).setOrigin(0,0);
        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'AQUA PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px';
        menuConfig.backgroundColor = '#0000007F'
        this.add.text(game.config.width/2, game.config.height/2, 'Use <- -> arrows to move & (UP) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#0012D6'
        menuConfig.config = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 2,
                submarineSpeed: 6,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene2');
            //
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 5,
                submarineSpeed: 10,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}