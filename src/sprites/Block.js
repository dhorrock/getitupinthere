import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'ground');
    this.initializePhysics();
    this.initializeSize();
  }

  initializePhysics() {
      this.game.physics.enable(this);
      this.body.immovable = true;
  }

  initializeSize() {
      this.width = 32;
      this.height = 16;
  }

  update () {
  }
}
