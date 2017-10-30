/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player';
import GameWorld from '../GameObjects/GameWorld';
import Stars from '../GameObjects/Stars';

export default class Main extends Phaser.State {
  init () {
    this.score = 0;
  }
  preload () {}

  create() {
    this.initializePhysics();
    this.initializeGameWorld();
    this.initializePlayer();
    this.initializeScoreBoard();
  }

  initializePhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  initializeGameWorld() {
    this.game.add.sprite(0, 0, 'sky');
    this.platforms = new GameWorld({game: this.game})
    this.stars = new Stars({game: this.game});
  }

  initializePlayer() {
    this.player = new Player({game: this.game, x: 32, y: this.game.world.height - 150});
    this.game.add.existing(this.player);
  }

  initializeScoreBoard() {
    this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000'});
  }

  update() {
    const hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);

    this.player.body.velocity.x = 0;

    const cursors = this.game.input.keyboard.createCursorKeys();
    this.player.watchForPlayerInput(cursors);

    if(hitPlatform) {
      this.player.watchForJump(cursors);
    }

    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  collectStar(player, star) {
    star.kill();

    this.score += 10;
    this.scoreText.text = "Score: " + this.score;
  }
}
