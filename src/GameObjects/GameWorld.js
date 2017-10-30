import Phaser from 'phaser';
import Block from '../sprites/Block';
export default class extends Phaser.Group {
    constructor ({game, player}) {
        super(game);
        this.enableBody = true;

        const X_OFFSET = 6;
        const Y_OFFSET = 6;
        const BLOCK_WIDTH = 32;
        const BLOCK_HEIGHT = 16;
        const ROW_INDENT = 32;
        const COLUMN_INDENT = 60;

        for(let y = 0; y < 15; y++) {
            for(let x = 0; x < 20; x++) {
                this.add(new Block({game: this.game, x: x * (BLOCK_WIDTH+X_OFFSET) + ROW_INDENT, y: y * (BLOCK_HEIGHT + Y_OFFSET) + COLUMN_INDENT}));
            }
        }
    }

    update() {
        if(this.countDead() === this.children.length) {
            console.log("ALL DEAD!!!");
        }
    }
}