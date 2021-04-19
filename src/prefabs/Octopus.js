class Octopus extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        //left/right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }
        //if fired, move up, randomly moves a couple pixels left and right
        if(this.isFiring && this.y >= borderUISize*3 + borderPadding){
            this.y -= this.moveSpeed;
            if(Math.random()>0.5){
                this.x += Math.floor(Math.random()*16);
            }else{
                this.x -= Math.floor(Math.random()*16);
            }
        }
        //reset on miss
        if(this.y <= borderUISize*3 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderPadding - borderUISize;
    }

}