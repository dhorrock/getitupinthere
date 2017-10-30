import Phaser from 'phaser';

export default class extends Phaser.Group {
    constructor ({game, player}) {
        super(game);
        this.enableBody = true;

        //Bottom Ground
        const ground = this.createGround(0, this.game.world.height - 64);
        ground.scale.setTo(2,2);

        //Ledges
        this.createGround(-150, 250);
        this.createGround(400, 400);
    }

    createGround(x, y) {
        const ledge = this.create(x, y, 'ground');
        ledge.body.immovable = true;
        return ledge;
    }
}