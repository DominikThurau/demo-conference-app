import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);
let keyA;
let keyS;
let keyD;
let keyW;
let isOverlapping = false;

function preload() {
  this.load.image("player", "assets/mario.jpeg");
  this.load.image("telefonzelle", "assets/telefonzelle.jpg");
}

function create() {
  //create keys

  //create keys
  this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  //create player
  this.player = this.physics.add.image(400, 300, "player");
  this.player.setCollideWorldBounds(true);
  this.player.setDepth(1);
  //create telefonzelle
  this.telefonzelle = this.physics.add.image(200, 400, "telefonzelle");
  this.telefonzelle.setScale(0.5);
  //dont affect by gravity
  this.telefonzelle.setImmovable(true);
  this.telefonzelle.body.setAllowGravity(false);
  //set background to white
  this.cameras.main.setBackgroundColor("#ffffff");
  this.cursorKeys = this.input.keyboard.createCursorKeys();
}

function update() {
  const moveSpeed = 500;
  this.player.setDrag(5000);
  if (this.cursorKeys.left.isDown || this.keyA.isDown) {
    this.player.setVelocityX(-moveSpeed);
  } else if (this.cursorKeys.right.isDown || this.keyD.isDown) {
    this.player.setVelocityX(moveSpeed);
  } else if (this.cursorKeys.up.isDown || this.keyW.isDown) {
    this.player.setVelocityY(-moveSpeed);
  } else if (this.cursorKeys.down.isDown || this.keyS.isDown) {
    this.player.setVelocityY(moveSpeed);
  }
  //print hello on overlap
  this.physics.add.overlap(this.player, this.telefonzelle, () => {
    //if isOverlapping is false, print hello
    if (!isOverlapping) {
      console.log("you entered the call");
      isOverlapping = true;
    }
  });
  //if player is not overlapping, set isOverlapping to false
  if (!this.physics.overlap(this.player, this.telefonzelle)) {
    isOverlapping = false;
  }
}
