import Phaser from "phaser";
import logo from "../assets/logo.png";

var baseGameSceneConfig = {
  preload: preload,
  create: create,
  key: 'base'
};

var backgroundSceneConfig = {
    key: 'background',
    active: true,
    create: createBackground,
    render: renderBackground,
    files: [
        { type: 'image', key: 'backgroundImage', url: '../assets/background.png' }
    ]
};

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [backgroundSceneConfig, baseGameSceneConfig]
};

function createBackground() {
  this.add.image(0, 0, 'backgroundImage')
}

function renderBackground() {

}

let game = new Phaser.Game(config);

function preload() {
 
}

function create() {

const rect = new Phaser.Geom.Rectangle(32, 32, 128, 256);

  // const logo = this.add.image(400, 150, "logo");

  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: "Power2",
  //   yoyo: true,
  //   loop: -1
  // });
}

export { game };
