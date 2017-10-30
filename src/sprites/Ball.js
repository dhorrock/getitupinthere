import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({ game, x , y }) {
        super(game, x, y, 'star');
        this.initalizePhysics();
    }

    initalizePhysics() {
        this.game.physics.enable(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);
    }

    update() {

    }
}