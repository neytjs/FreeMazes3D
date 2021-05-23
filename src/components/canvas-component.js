import React, {Component} from 'react';
import cannon from 'cannon';
window.CANNON = cannon;
import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import {SceneLoader} from "@babylonjs/core/Loading";
import 'babylonjs-loaders';
import "@babylonjs/core/Physics/physicsEngineComponent";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {CannonJSPlugin} from "@babylonjs/core/Physics/Plugins";
import {Vector3, Matrix} from "@babylonjs/core/Maths/math";
import {Ray} from "@babylonjs/core/Culling";
import {UniversalCamera} from "@babylonjs/core/Cameras/universalCamera";
import {Sound} from "@babylonjs/core/Audio";
import SceneGenerator from "./scenes/scene_generator.js";
import {keyUp} from "./controls/keyUp.js";
import {GUI_DisplayHighScores} from "./gui/gui_display_high_scores.js";
import {GUI_Score} from "./gui/gui_score.js";
import {exit_pos} from "./generators/maze_generator.js";
import {collectKey} from "./actions/collectKey.js";
import {doorMessage} from "./actions/doorMessage.js";
import {openGate} from "./actions/openGate.js";
import {forceFieldMessage} from "./actions/forceFieldMessage.js";
import {collectTreasure} from "./actions/collectTreasure.js";
import {collectGem} from "./actions/collectGem.js";
import {portalMessage} from "./actions/portalMessage.js";
import {powerPortal} from "./actions/powerPortal.js";
import {exitMap} from "./actions/exitMap.js";
import {discoverSecret} from "./actions/discoverSecret.js";
import {moveSecretWall} from "./actions/moveSecretWall.js";
import {placeCoinOb1} from "./actions/placeCoinOb1.js";
import {removeCoinOb1} from "./actions/removeCoinOb1.js";
import {pedestalWarningOb1} from "./actions/pedestalWarningOb1.js";
import {hintMessageOb2} from "./actions/hintMessageOb2.js";
import {pushButtonsOb2} from "./actions/pushButtonsOb2.js";
import {changeBulbColorOb2} from "./actions/changeBulbColorOb2.js";
import {pushButtonsOb3} from "./actions/pushButtonsOb3.js";
import {agentSummonsOb3} from "./actions/agentSummonsOb3.js";
import {agentCollisionsOb3} from "./actions/agentCollisionsOb3.js";
import {teleportPlayerOb4} from "./actions/teleportPlayerOb4.js";
import {pushButtonsOb4} from "./actions/pushButtonsOb4.js";
import {moveGreenOb4} from "./actions/moveGreenOb4.js";
import {movingGreenOb4} from "./actions/movingGreenOb4.js";
import {moveBlueOb4} from "./actions/moveBlueOb4.js";
import {movingBlueOb4} from "./actions/movingBlueOb4.js";
import {removeBarrierOb4} from "./actions/removeBarrierOb4.js";
import {warnMessageOb5} from "./actions/warnMessageOb5.js";
import {removeSpearOb5} from "./actions/removeSpearOb5.js";
import {pushButtonsOb5} from "./actions/pushButtonsOb5.js";
import {swingSpearOb5} from "./actions/swingSpearOb5.js";
import {removeBarrierOb5} from "./actions/removeBarrierOb5.js";
import {placeCrystalOb6} from "./actions/placeCrystalOb6.js";
import {removeCrystalOb6} from "./actions/removeCrystalOb6.js";
import {warnMessageOb7} from "./actions/warnMessageOb7.js";
import {removeSpearOb7} from "./actions/removeSpearOb7.js";
import {swingSpearOb7} from "./actions/swingSpearOb7.js";
import {pushButtonsOb7} from "./actions/pushButtonsOb7.js";
import {removeBarrierOb7} from "./actions/removeBarrierOb7.js";
import {removeWateringCanOb8} from "./actions/removeWateringCanOb8.js";
import {fillWateringCanOb8} from "./actions/fillWateringCanOb8.js";
import {growPlantOb8} from "./actions/growPlantOb8.js";
import {shrinkPlantOb8} from "./actions/shrinkPlantOb8.js";
import {pourWaterOb8} from "./actions/pourWaterOb8.js";

const remote = window.require('electron').remote;
var app_path = remote.app.getAppPath('');
var DataStore = window.require('nedb');
var app_data = new DataStore({ filename: app_path+'/data/app_data.db', autoload: true });
const defaultAppData = {
  high_scores: []
};

let door_objects = [];
let forcefield_objects = [];
let key_objects = [];
let portal_objects = [];
let gem_objects = [];
let treasure_objects = [];
let trasure_stats = {
  treasure_total: 0,
  treasure_counter: 0
};
let obstacle_objects = [];
let inventory = [{inventory: ""}];
let inventory_tracker = {
  current_item: 0
};
let secret_walls = [];
let secret_data = {
  total: 0,
  counter: 0
};
let score = {
  total: 0
};
let map_size = {
  size: ""
};
let menu_gui = {
  counter: 0,
  options: [
    "new_game",
    "controls",
    "high_scores",
    "credits",
    "exit_game"
  ],
  difficulty_counter: 0,
  difficulty_options: [
    "easy",
    "medium",
    "hard",
    "back"
  ],
  warn_counter: 0,
  warn_options: [
    "cancel",
    "okay"
  ],
  press_counter: 0
};

class Canvas extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.mockRef = React.createRef();
    this.pressE = false;
    this.engine = {};
    this.camera = {};
    this.scene = {};
    this.keyUp = keyUp.bind(this, menu_gui, map_size, inventory, inventory_tracker, this.saveScoreAndClose.bind(this), this.scene, this.resetGlobals.bind(this));

    this.state = {
      start: false,
      high_scores: []
    }
  }

  async componentDidMount() {
    let ret_app_data = await this.getAppData();
    this.setState({ high_scores: ret_app_data.high_scores }, () => {
      document.addEventListener("keyup", this.keyUp, false);
      this.launchMock();
      document.getElementById("menu").style.left = 0;
      GUI_DisplayHighScores(this.state.high_scores);
    });
  }

  getAppData() {
    return new Promise(resolve => {
      app_data.findOne({}, function(err, dat) {
        if (dat) {
          resolve(dat);
        } else {
          app_data.insert(defaultAppData, function(err, docs) {
            resolve(docs);
          });
        }
      });
    });
  }

  updateEventListener() {
    document.removeEventListener("keyup", this.keyUp, false);
    this.keyUp = keyUp.bind(this, menu_gui, map_size, inventory, inventory_tracker, this.saveScoreAndClose.bind(this), this.scene, this.resetGlobals.bind(this));
    document.addEventListener("keyup", this.keyUp, false);
  }

  resetGlobals() {
    this.engine.dispose(true, true);
    door_objects = [];
    forcefield_objects = [];
    key_objects = [];
    portal_objects = [];
    gem_objects = [];
    treasure_objects = [];
    trasure_stats = {
      treasure_total: 0,
      treasure_counter: 0
    };
    obstacle_objects = [];
    inventory = [{inventory: ""}];
    inventory_tracker = {
      current_item: 0
    };
    secret_walls = [];
    secret_data = {
      total: 0,
      counter: 0
    };
    GUI_Score(0, score);
    document.getElementById("inventory_item_label").innerHTML = "";
    document.getElementById("inventory_img").innerHTML = "";
  }

  reStart() {
    this.setState({ start: false }, () => {
      this.launchMock();
      this.updateEventListener();
    });
  }

  saveScoreAndClose() {
    let new_score = score.total;
    if (new_score > 0) {
      let new_high_scores = this.state.high_scores;
      new_high_scores.push({score: new_score, date: new Date()});
      app_data.update({}, {$set:{high_scores: new_high_scores}}, (err, docs) => {
        window.close();
      });
    } else {
      window.close();
    }
  }

  launchMock() {
    const canvas = this.mockRef;

    this.engine = new Engine(canvas);

    this.scene = new Scene(this.engine);
    this.camera = new UniversalCamera("UniversalCamera", new Vector3(0, 0, -10), this.scene);

    this.updateEventListener();

    this.scene.executeWhenReady(() => {
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
    });
  }

  launchGame() {
    const canvas = this.canvasRef;

    this.engine = new Engine(canvas);

    this.scene = new Scene(this.engine);
    this.scene.gravity = new Vector3(0, -9.81, 0);
    this.scene.enablePhysics();

    this.camera = new UniversalCamera("UniversalCamera", new Vector3(0, 0, -10), this.scene);
    this.scene.activeCamera = this.camera;
    this.scene.activeCamera.attachControl(canvas);

    this.camera.position.y = 4;
    this.camera.speed = 0.7;
    this.camera.keysUp = [87]; // w
    this.camera.keysDown = [83]; // s
    this.camera.keysLeft = [65]; // a
    this.camera.keysRight = [68]; // d

    this.camera.setTarget(Vector3.Zero());

    this.camera.applyGravity = true;

    this.camera.ellipsoid = new Vector3(1.5, 2, 1.5);

    this.engine.enterPointerlock();
    canvas.focus();

    this.scene.collisionsEnabled = true;
    this.camera.checkCollisions = true;
    this.camera._needMoveForGravity = true;

  // call the SceneGenerator to create the map and generate the maze.
    SceneGenerator.returnScene(this.scene, this.camera, door_objects, forcefield_objects, key_objects, portal_objects, gem_objects, treasure_objects, trasure_stats, obstacle_objects, secret_walls, secret_data, map_size);
    this.updateEventListener();

    let buttons = {
      pushingButton: "",
      goingDown: true
    };
    let player = {
      holding: "",
      swing_spear: false,
      spear_forward: true
    };
    let pressedKeys = {
      87: false,
      83: false,
      65: false,
      68: false
    };
    let solved = {
      solvedP1: 0,
      solvedP2: false,
      solvedP3: false,
      solvedP4: false,
      solvedP5: false,
      solvedP6: false,
      solvedP7: false,
      solvedP8: false
    };
    let ob1 = {
      warned: false
    }
    let ob2 = {
      b1counter: 0,
      b2counter: 0,
      b3counter: 0,
      b4counter: 0,
      hinted: false,
      running: false,
      bulb: "",
      bulb_color: {}
    };
    let ob3 = {
      just_spliced: false
    };
    let ob4 = {
      movingGreen: false,
      movingBlue: false,
      green_played: false,
      blue_played: false
    };
    let ob5 = {
      warned: false,
      ghost_part_counter: 0,
      ghost_counter: 0,
      swing_sound_counter: 0,
      hit_sound_counter: 0,
      holding: false,
      starting_position: {},
      starting_distance: [],
      ghost1_crystal_hp: 100,
      ghost2_crystal_hp: 100,
      ghost3_crystal_hp: 100
    };
    let ob6 = {
      holding: {},
      just_accessed: false
    };
    let ob7 = {
      warned: false,
      power_counter: 0,
      swing_sound_counter: 0,
      hit_sound_counter: 0,
      holding: false,
      starting_position: {},
      starting_distance: [],
      power1_crystal_hp: 100,
      power2_crystal_hp: 100,
      power3_crystal_hp: 100
    };
    let ob8 = {
      fruitTree: false,
      pineTree: false,
      cactus: false,
      flower: false,
      growing: false,
      growing_name: "",
      shrinking: false,
      shrinking_name: "",
      pouring: false,
      water: 0,
      water_counter: 0,
      pouring_sound: false
    };
    let current_secret = {
      secret: {}
    };
    let secret_moving = {
      motion: false
    };
    document.addEventListener("click", () => {
      if (player.holding !== "") {
        player.swing_spear = true;
      }
    }, false);
    document.addEventListener("keydown", () => {
    // for pouring water in obstacle 8
      if (event.keyCode === 69 && ob8.pouring === false && solved.solvedP8 === false) {
        ob8.pouring = true;
        if (ob8.water > 0) {
          ob8.pouring_sound = new Sound("Sound", "./sound/loop_rain.ogg", this.scene, null, { loop: true, autoplay: true });
        }
      }
    }, false);
    document.addEventListener("keyup", () => {
    // for pouring water in obstacle 8
      if (event.keyCode === 69 && ob8.pouring === true) {
        ob8.pouring = false;
        if (ob8.pouring_sound) {
          ob8.pouring_sound.dispose(true, true);
          ob8.pouring_sound = null;
        }
      }
    }, false);

    let handleCameraCollisions = () => {
      this.camera.onCollide = (colMesh) => {
      // test for door collisions
        doorMessage(colMesh, door_objects, inventory);
      // test for force field collisions
        forceFieldMessage(colMesh, forcefield_objects);
      // test for key collisions
        collectKey(colMesh, key_objects, inventory, inventory_tracker, this.scene);
      // test for portal collisions
        portalMessage(portal_objects, inventory, colMesh);
      // test for gem collisions
        collectGem(gem_objects, inventory, inventory_tracker, colMesh, this.scene);
      // for treasure collisions
        collectTreasure(treasure_objects, trasure_stats, colMesh, score, this.scene);
      // for hint collision
        hintMessageOb2(colMesh, ob2, this.scene);
      // for ghost barrier collision
        warnMessageOb5(colMesh, ob5, this.scene);
      // for removing ghost spear
        removeSpearOb5(colMesh, ob5, this.scene, this.camera, player);
      // for hut barrier collision
        warnMessageOb7(colMesh, ob7, this.scene);
      // for removing hut spear
        removeSpearOb7(colMesh, ob7, this.scene, this.camera, player);
      // for removing the watering can
        removeWateringCanOb8(colMesh, this.scene, this.camera, player);
      // for obstacle_objects items
        for (let i = 0, length = obstacle_objects.length; i < length; i++) {
          if (colMesh.uniqueId === obstacle_objects[i].id) {
          // warn if hits pedestal
            pedestalWarningOb1(obstacle_objects[i], inventory, ob1, solved, colMesh);
          // testing for the coin
            removeCoinOb1(obstacle_objects[i], inventory, inventory_tracker, colMesh, this.scene);
          // for obstacle 4 teleportation...
            teleportPlayerOb4(obstacle_objects[i], colMesh, this.camera, this.scene);
          }
        }
      }
    }
    handleCameraCollisions();

    let divFps = document.getElementById("fps");

    this.scene.executeWhenReady(() => {
      this.engine.runRenderLoop(() => {
        divFps.innerHTML = this.engine.getFps().toFixed() + " fps";
        this.scene.render();
      // for secrets
        moveSecretWall(secret_moving, current_secret, this.scene, secret_data);
      // for swinging ghost spear
        swingSpearOb5(ob5, this.scene, this.camera, solved, player);
      // for swinging hut spear
        swingSpearOb7(ob7, this.scene, this.camera, solved, player);
      // for growing plants
        growPlantOb8(this.scene, this.camera, ob8, solved, obstacle_objects, forcefield_objects, score, player);
      // for shrinking plants
        shrinkPlantOb8(this.scene, ob8);
      // for pouring water
        pourWaterOb8(solved, this.scene, this.camera, ob8);

        if (this.pressE === true) {
          let starting_position = {};
          let direction = {};

          let invView = new Matrix();
          this.camera.getViewMatrix().invertToRef(invView);
          direction = Vector3.TransformNormal(new Vector3(-0.15, 0.1, 1), invView);
          direction.normalize();

          let castRay = () => {
            let origin = this.camera.position;
            if (Object.keys(starting_position).length === 0) {
              starting_position = this.camera.position;
            }
            let length = 4;
            let ray = new Ray(origin, direction, length);

            let hit = this.scene.pickWithRay(ray);

            if (hit) {
              if (hit.pickedMesh && hit.pickedMesh.name) {
              // for doors/gates
                openGate(hit, door_objects, inventory, inventory_tracker, this.scene);
              // for exit portal
                powerPortal(hit, portal_objects, inventory, inventory_tracker, exit_pos, this.scene);
              // exiting the map
                exitMap(hit, this.resetGlobals.bind(this), this.reStart.bind(this), this.scene);
              // for discovering secret walls
                discoverSecret(hit, secret_walls, secret_data, secret_moving, current_secret, score, this.scene);
              // for obstacle 1
                placeCoinOb1(hit, this.scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score);
              // for obstacle 2
                pushButtonsOb2(hit, solved, buttons, ob2, this.scene);
              // for obstacl 3...
                pushButtonsOb3(hit, solved, buttons, this.scene);
              // for obstacle 4
                pushButtonsOb4(hit, solved, buttons, this.scene);
              // for obstacle 5
                pushButtonsOb5(hit, solved, buttons, this.scene);
              // for obstacle 7
                pushButtonsOb7(hit, solved, buttons, this.scene);
              // for placing a crystal in obstacle 6
                placeCrystalOb6(hit.pickedMesh.name, obstacle_objects, forcefield_objects, this.scene, this.camera, solved, ob6, player, score);
              // for removing a crystal in obstacle 6
                removeCrystalOb6(hit.pickedMesh.name, obstacle_objects, this.scene, this.camera, solved, ob6, player);
              // for filling the watering can in obstacle 8
                fillWateringCanOb8(this.scene, solved, hit.pickedMesh.name, ob8, player);
              }
            }
            this.pressE = false;
          }
          castRay();
        }

      // for obstacle 3
        agentCollisionsOb3(solved, ob3, obstacle_objects, forcefield_objects, this.scene, score);

        if (buttons.pushingButton !== "") {
          let pushButton = this.scene.getMeshByName(buttons.pushingButton);
          let down_val = 2.9;
          let top_val = 3.25;
        // for obstacle 4's different button heights
          if (buttons.pushingButton === "pushButton1p4a" || buttons.pushingButton === "pushButton1p4b" || buttons.pushingButton === "pushButton1p4c") {
            down_val = 8.9;
            top_val = 9.25;
          }
          if (pushButton.position.y > down_val && buttons.goingDown === true) {
            pushButton.position.y -= 0.01;
          } else if (pushButton.position.y < down_val && buttons.goingDown === true) {
          // for obstacle 2
            changeBulbColorOb2(solved, buttons, ob2, obstacle_objects, forcefield_objects, this.scene, score);
          // for obstacle 3
            agentSummonsOb3(buttons, ob3, this.scene);
          // for obstacle 4
            moveGreenOb4(buttons, ob4);
            moveBlueOb4(buttons, ob4);
            removeBarrierOb4(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
          // for obstacle 5
            removeBarrierOb5(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
          // for obstacle 7
            removeBarrierOb7(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
            buttons.goingDown = false;
          } else if (pushButton.position.y < top_val && buttons.goingDown === false) {
            pushButton.position.y += 0.01;
          } else {
            buttons.goingDown = true
            buttons.pushingButton = "";
            ob2.running = false;
          }
        }

      // for obstacle 4 moving bridges
        movingGreenOb4(ob4, this.scene);
        movingBlueOb4(ob4, this.scene);
      });
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.keyUp, false);
  }

  render() {
    return (
      <div>
        { this.state.start === false ? <canvas ref={mockRef => this.mockRef = mockRef} tabIndex={0} width="512px" height="288px" display="block"></canvas> :
          <canvas ref={canvasRef => this.canvasRef = canvasRef} tabIndex={0} width="512px" height="288px" display="block"></canvas>
        }
      </div>
    )
  }
}

export default Canvas;
