import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'dude');
    this.initializePhysics();
    this.initializeAnimations();
  }

  initializePhysics() {
    this.game.physics.enable(this);
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
  }

  initializeAnimations() {
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  watchForPlayerInput(cursors) {
    if(cursors.left.isDown) {
      this.body.velocity.x = -150;
      this.animations.play('left');
    } else if (cursors.right.isDown) {
      this.body.velocity.x = 150;
      this.animations.play('right');
    } else {
      this.animations.stop();
      this.frame = 4;
    }
  }

  watchForJump(cursors) {
    if(cursors.up.isDown && this.body.touching.down) {
      this.body.velocity.y = -350;
    }
  }

  update () {
    // console.log('update');
  }
}
