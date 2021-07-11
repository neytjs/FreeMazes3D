import {playSound} from "../assets/playSound.js";
import {ballLandsOb9} from "./ballLandsOb9.js";

function fallingBallOb9(solved, ob9, scene, score, obstacle_objects, forcefield_objects) {
  if (solved.solvedP9 === false) {
    const end = 2.6;
    const rate = 0.2;
    if (ob9.hiddenBall1falling) {
      let hiddenBall = scene.getMeshByName("hiddenBall1");
      if (hiddenBall.position.y > end) {
        hiddenBall.position.y = hiddenBall.position.y - rate;      
      } else {
        ob9.hiddenBall1falling = false;
        ob9.pipe1rolling = false;
        ballLandsOb9(ob9, obstacle_objects, forcefield_objects, solved, scene, score, "hiddenBall1", 1);
      }
    }
    if (ob9.hiddenBall2falling) {
      let hiddenBall = scene.getMeshByName("hiddenBall2");
      if (hiddenBall.position.y > end) {
        hiddenBall.position.y = hiddenBall.position.y - rate;
      } else {
        ob9.hiddenBall2falling = false;
        ob9.pipe2rolling = false;
        ballLandsOb9(ob9, obstacle_objects, forcefield_objects, solved, scene, score, "hiddenBall2", 2);
      }
    }
    if (ob9.hiddenBall3falling) {
      let hiddenBall = scene.getMeshByName("hiddenBall3");
      if (hiddenBall.position.y > end) {
        hiddenBall.position.y = hiddenBall.position.y - rate;
      } else {
        ob9.hiddenBall3falling = false;
        ob9.pipe3rolling = false;
        ballLandsOb9(ob9, obstacle_objects, forcefield_objects, solved, scene, score, "hiddenBall3", 3);
      }
    }
    if (ob9.hiddenBall4falling) {
      let hiddenBall = scene.getMeshByName("hiddenBall4");
      if (hiddenBall.position.y > end) {
        hiddenBall.position.y = hiddenBall.position.y - rate;
      } else {
        ob9.hiddenBall4falling = false;
        ob9.pipe4rolling = false;
        ballLandsOb9(ob9, obstacle_objects, forcefield_objects, solved, scene, score, "hiddenBall4", 4);
      }
    }
  }
}

export {fallingBallOb9};
