import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'ground');
    this.height = 32;
    this.width = 124;
    this.anchor.setTo(0.5, 0);
    this.initializePhysics();
  }

  initializePhysics() {
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;

  }

  watchForPlayerInput(cursors) {
    this.body.velocity.x = 0;
    if(cursors.left.isDown) {
      this.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
      this.body.velocity.x = 300;
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
