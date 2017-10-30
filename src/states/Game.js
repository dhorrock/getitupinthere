/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player';
import GameWorld from '../GameObjects/GameWorld';
import Stars from '../GameObjects/Stars';
import Ball from '../sprites/Ball';

export default class Main extends Phaser.State {
  init () {
    this.textStyle = { font: '18px Arial', fill: '#eee' };
    this.score = 0;
    this.lives = 3;
  }
  preload () {}

  create() {
    this.initializePhysics();
    this.initializeGameWorld();
    this.initializePlayer();
    this.initializeBall();
    this.initializeText();
  }

  initializePhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.checkCollision.down = false;
  }

  initializeGameWorld() {
    this.initializeBackground();
    
    this.blocks = new GameWorld({game: this.game})
  }

  initializeBackground() {
    const bg = this.game.add.sprite(0, 0, 'background');
    bg.width = this.game.width;
    bg.height = this.game.height;
  }

  initializePlayer() {
    this.player = new Player({game: this.game, x: this.game.world.centerX, y: this.game.world.height - 32});
    this.game.add.existing(this.player);
  }

  initializeBall() {
    this.ball = new Ball({game: this.game, x : this.game.world.centerX, y: this.game.world.height - this.game.world.centerY/2});
    this.ball.body.velocity.set(150, -150);
    this.game.add.existing(this.ball);
    this.ball.checkWorldBounds = true;
    this.ball.events.onOutOfBounds.add(this.OnBallLeaveScreen, this);
  }

  initializeText() {
    this.scoreText = this.game.add.text(5, 5, 'Score: 0', this.textStyle);
    this.livesText = this.game.add.text(this.game.world.width - 5, 5, 'Lives: ' + this.lives, this.textStyle);
    this.livesText.anchor.set(1, 0);

    this.livesLostText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Life Lost, Please Click To Continue', this.textStyle);
    this.livesLostText.anchor.set(0.5);
    this.livesLostText.visible = false;
  }

  OnBallLeaveScreen() {
    this.lives--;
    if(this.lives > 0) {
      this.livesText.setText('Lives: ' + this.lives);
      this.livesLostText.visible = true;
      this.ball.reset(this.game.world.centerX, this.game.world.heigt - this.game.world.centerY/2);
      this.player.reset(this.game.world.centerX, this.game.world.height - 32);
      this.game.input.onDown.addOnce(this.OnContinue, this)
    } else {
      this.OnGameOver();
    }
  }

  OnContinue() {
    this.livesLostText.visible = false;
    this.ball.body.velocity.set(150, -150);
  }

  OnGameOver() {
    alert('Game Over!');
  }

  update() {
    this.watchForInput()

    this.game.physics.arcade.collide(this.player, this.ball, this.onBallHitPaddle, null, this);
    this.game.physics.arcade.collide(this.ball, this.blocks, this.OnBallHitBrick, null, this);
  
  }

  watchForInput() {
    const cursors = this.game.input.keyboard.createCursorKeys();
    this.player.watchForPlayerInput(cursors);
  }

  OnBallHitBrick(ball, brick) {
    const killTween = this.game.add.tween(brick.scale);

    killTween.to({x:0, y:0}, 200, Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(() => brick.kill());
    killTween.start();
    this.score+= 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  onBallHitPaddle(player, ball) {
    ball.body.velocity.x = -1*5*(player.x-ball.x);
  }
}
