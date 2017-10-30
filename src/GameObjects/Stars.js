import Phaser from 'phaser';

export default class extends Phaser.Group {
    constructor ({game}) {
        super(game);
        this.enableBody = true;

        for(let i = 0; i < 12; i++) {
            const star = this.create(i * 70, 0, 'star');

            star.body.gravity.y = 6;

            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    }

}