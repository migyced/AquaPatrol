/*----------------------------------------
Name: Miguel Cedillo
Class: CMPM 120
Project Title: Rocket Patrol Mods aka Aqua Patrol
Project Length: 15 hours
//
Point Breakdown
 - Redesign the game's artwork,UI, & Sound(60pts): I changed the theme to be aquatic(fish vs boats)
 - Create and implement a new weapon(20): The octopus is the new weapon, it is only used in the Novice level because
    it is easier to hit the boats. When fired, the octopus will randomly move left and right as it travels up.
 - Create a new spaceship(boat) that's smaller, moves faster, and is worth more points(20): I added the submarine to 
    the game, it is worth 50 points and is partially submerged.
----------------------------------------*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, PlayEasy]
}

let game = new Phaser.Game(config);
let keyUP, keyR, keyLEFT, keyRIGHT, keyW, keyA, keyD;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize /3;