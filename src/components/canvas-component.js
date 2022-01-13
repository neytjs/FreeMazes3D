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
import "@babylonjs/core/Rendering/boundingBoxRenderer";
import {GlowLayer} from "@babylonjs/core/Layers";
import {Vector3, Matrix} from "@babylonjs/core/Maths/math";
import {Ray} from "@babylonjs/core/Culling";
import {UniversalCamera} from "@babylonjs/core/Cameras/universalCamera";
import {Sound} from "@babylonjs/core/Audio";
import {KeyboardEventTypes} from "@babylonjs/core/Events";
import {sceneGenerator} from "./scenes/scene_generator.js";
import {keyUp} from "./controls/keyUp.js";
import {readConfig, handleKeyData} from "./controls/keyConfig.js";
import {showKeyControls} from "./gui/gui_key_controls.js";
import {GUI_DisplayHighScores} from "./gui/gui_display_high_scores.js";
import {GUI_DisplayAchievements} from "./gui/gui_display_achievements.js";
import {GUI_Score} from "./gui/gui_score.js";
import {setMenuBackgroundColors} from "./gui/gui_background.js";
import {setTimer, runTimer, displayTime} from "./gui/gui_timer.js";
import {exit_pos, start_pos} from "./generators/maze_generator.js";
import {defaultAppData} from "./assets/defaultAppData.js";
import {playMusic, playMenuMusic} from "./assets/playMusic.js";
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
import {playerHoldingDistanceTest} from "./actions/playerHoldingDistanceTest.js";
import {playerHoldingGhostSpearDistanceCheck} from "./actions/playerHoldingGhostSpearDistanceCheck.js";
import {playerHoldingHutSpearDistanceCheck} from "./actions/playerHoldingHutSpearDistanceCheck.js";
import {playerHoldingWateringCanDistanceCheck} from "./actions/playerHoldingWateringCanDistanceCheck.js";
import {playerHoldingBlasterDistanceCheck} from "./actions/playerHoldingBlasterDistanceCheck.js";
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
import {removeBallOb9} from "./actions/removeBallOb9.js";
import {dropBallOb9} from "./actions/dropBallOb9.js";
import {pickUpBallOb9} from "./actions/pickUpBallOb9.js";
import {setBallOb9} from "./actions/setBallOb9.js";
import {fallingBallOb9} from "./actions/fallingBallOb9.js";
import {climbLadderOb10} from "./actions/climbLadderOb10.js";
import {acidDeathOb10} from "./actions/acidDeathOb10.js";
import {pushButtonsOb10} from "./actions/pushButtonsOb10.js";
import {removeBarrierOb10} from "./actions/removeBarrierOb10.js";
import {movementTestOb11} from "./actions/movementTestOb11.js";
import {shellsHitPlayerTestOb11} from "./actions/shellsHitPlayerTestOb11.js";
import {movementTestOb12} from "./actions/movementTestOb12.js";
import {laserHitPlayerTestOb12} from "./actions/laserHitPlayerTestOb12.js";
import {enterExitPyramidOb13} from "./actions/enterExitPyramidOb13.js";
import {pushButtonsOb13} from "./actions/pushButtonsOb13.js";
import {handleButtonPressOb13} from "./actions/handleButtonPressOb13.js";
import {removePowderOb13} from "./actions/removePowderOb13.js";
import {placePowderOb13} from "./actions/placePowderOb13.js";
import {enterExitCryptOb14} from "./actions/enterExitCryptOb14.js";
import {removeWaterOb14} from "./actions/removeWaterOb14.js";
import {warnMessageOb14} from "./actions/warnMessageOb14.js";
import {pourWaterOb14} from "./actions/pourWaterOb14.js";
import {warnMessageOb15} from "./actions/warnMessageOb15.js";
import {removeBlasterOb15} from "./actions/removeBlasterOb15.js";
import {climbStepOb15} from "./actions/climbStepOb15.js";
import {shootBlasterOb15} from "./actions/shootBlasterOb15.js";
import {removeBarrierOb15} from "./actions/removeBarrierOb15.js";
import {pushButtonsOb16} from "./actions/pushButtonsOb16.js";
import {handleButtonPressOb16} from "./actions/handleButtonPressOb16.js";
import {pourPotionOb17} from "./actions/pourPotionOb17.js";
import {removePotionOb17} from "./actions/removePotionOb17.js";
import {teleportPlayerOb18} from "./actions/teleportPlayerOb18.js";
import {warnMessageOb18} from "./actions/warnMessageOb18.js";
import {activateSoundMachineOb18} from "./actions/activateSoundMachineOb18.js";
import {pushButtonsOb18} from "./actions/pushButtonsOb18.js";
import {removeBarrierOb18} from "./actions/removeBarrierOb18.js";
import {teleportPlayerOb19} from "./actions/teleportPlayerOb19.js";
import {removeCrystalOb19} from "./actions/removeCrystalOb19.js";
import {setCrystalOb19} from "./actions/setCrystalOb19.js";
import {pickUpCrystalOb19} from "./actions/pickUpCrystalOb19.js";
import {rollingBallOb20} from "./actions/rollingBallOb20.js";
import {pushButtonsOb20} from "./actions/pushButtonsOb20.js";
import {handleButtonPressOb20} from "./actions/handleButtonPressOb20.js";
import {warnMessageOb20} from "./actions/warnMessageOb20.js";

const {app, BrowserWindow} = window.require('@electron/remote');
const DataStore = window.require('nedb');
const app_filepath = app.getAppPath('');
const app_data = new DataStore({ filename: app_filepath+'/data/app_data.db', autoload: true });

let global_keys = {
  move_up: {default_letter: "w", code: 87, new_key: "w"},
  move_left: {default_letter: "a", code: 65, new_key: "a"},
  move_down: {default_letter: "s", code: 83, new_key: "s"},
  move_right: {default_letter: "d", code: 68, new_key: "d"},
  action_key: {default_letter: "e", code: 69, new_key: "e"},
  show_fps: {default_letter: "f", code: 70, new_key: "f"},
  toggle_left: {default_letter: "[", code: 219, new_key: "["},
  toggle_right: {default_letter: "]", code: 221, new_key: "]"}
};
let door_objects = [];
let forcefield_objects = [];
let key_objects = [];
let portal_objects = [];
let gem_objects = [];
let treasure_objects = [];
let treasure_stats = {
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
  size: "",
  type: "no"
};
let timer = {
  counter: 0,
  max_time: 0,
  time: "",
  prev_time: "",
  running: false,
  menu: false,
  timeOutFunct: {},
  setTimer: false,
  timesup_warned: false
};
let sound_track = {
  song: {},
  menu_song: {},
  menu: false
};
let maze = {
  loaded: false
};

let achievements = [];
let menu_gui = {
  counter: 0,
  toggle: false,
  options: [
    "new_game",
    "controls",
    "high_scores",
    "achievements",
    "credits",
    "exit_game"
  ],
  difficulty_counter: 0,
  difficulty_options: [
    "easy",
    "medium",
    "hard",
    "easy_tl",
    "medium_tl",
    "hard_tl",
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
    this.keyUp = keyUp.bind(this, global_keys, menu_gui, map_size, inventory, inventory_tracker, this.saveScoreAndClose.bind(this), this.scene, this.resetGlobals.bind(this), this.reStart.bind(this), timer, score, maze, sound_track);

    this.state = {
      start: false,
      high_scores: []
    }
  }

  async componentDidMount() {
    let ret_app_data = await this.getAppData();
    let key_data = await readConfig(app_filepath);
    handleKeyData(key_data, global_keys);
    showKeyControls(global_keys);
    this.setState({ high_scores: ret_app_data.high_scores }, () => {
      achievements = ret_app_data.achievements;
      document.addEventListener("keyup", this.keyUp, false);
      this.launchMock();
      document.getElementById("menu").style.left = 0;
      GUI_DisplayHighScores(this.state.high_scores);
      GUI_DisplayAchievements(achievements);
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
    this.keyUp = keyUp.bind(this, global_keys, menu_gui, map_size, inventory, inventory_tracker, this.saveScoreAndClose.bind(this), this.scene, this.resetGlobals.bind(this), this.reStart.bind(this), timer, score, maze, sound_track);
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
    treasure_stats = {
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
    timer = {
      counter: 0,
      max_time: 0,
      time: "",
      prev_time: "",
      running: false,
      menu: false,
      timeOutFunct: {},
      setTimer: false,
      timesup_warned: false
    };
    sound_track = {
      song: {},
      menu_song: {},
      menu: false
    };
    maze = {
      loaded: false
    };
    GUI_Score(0, score);
    document.getElementById("inventory_item_label").innerHTML = "";
    document.getElementById("inventory_img").innerHTML = "";
  }

  reStart() {
    this.setState({ start: false }, () => {
      setMenuBackgroundColors("rgba(128, 128, 128, 1)");
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

    playMenuMusic(this.scene, sound_track, true)
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
    this.camera.minZ = 0;
    this.camera.maxZ = 900;
    this.camera.position.y = 4;
    this.camera.speed = 0.7;
    this.camera.keysUp = [global_keys.move_up.code];
    this.camera.keysDown = [global_keys.move_down.code];
    this.camera.keysLeft = [global_keys.move_left.code];
    this.camera.keysRight = [global_keys.move_right.code];

    this.camera.setTarget(Vector3.Zero());

    this.camera.applyGravity = true;

    this.camera.ellipsoid = new Vector3(1.5, 2, 1.5);

    this.engine.enterPointerlock();
    canvas.focus();

    this.scene.collisionsEnabled = true;
    this.camera.checkCollisions = true;
    this.camera._needMoveForGravity = true;
    let glow = new GlowLayer("glow", this.scene);
    glow.intensity = 2;

    let puzzles = [];

  // call the sceneGenerator to create the map and generate the maze.
    sceneGenerator(this.scene, this.camera, door_objects, forcefield_objects, key_objects, portal_objects, gem_objects, treasure_objects, treasure_stats, obstacle_objects, secret_walls, secret_data, map_size, puzzles);
    this.updateEventListener();

    setTimer(timer, map_size, puzzles);

    let buttons = {
      pushingButton: "",
      goingDown: true,
      running: false
    };
    let player = {
      holding: "",
      puzzle_pos: {},
      swing_spear: false,
      spear_forward: true,
      walking_sound: false,
      already_walking: false,
      health: 100,
      grounded: true
    };
    let solved = {
      solvedP1: 0,
      solvedP2: false,
      solvedP3: false,
      solvedP4: false,
      solvedP5: false,
      solvedP6: false,
      solvedP7: false,
      solvedP8: false,
      solvedP9: false,
      solvedP10: false,
      solvedP11: false,
      solvedP12: false,
      solvedP13: false,
      solvedP14: false,
      solvedP15: false,
      solvedP16: false,
      solvedP17: false,
      solvedP18: false,
      solvedP19: false,
      solvedP20: false
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
      starting_position: {},
      starting_distance: [],
      ghost1_crystal_hp: 100,
      ghost2_crystal_hp: 100,
      ghost3_crystal_hp: 100
    };
    let ob6 = {
      holding: "",
      just_accessed: false
    };
    let ob7 = {
      warned: false,
      power_counter: 0,
      swing_sound_counter: 0,
      hit_sound_counter: 0,
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
      shrinking_fruitTree: false,
      shrinking_pineTree: false,
      shrinking_cactus: false,
      shrinking_flower: false,
      pouring: false,
      water: 0,
      water_counter: 0,
      pouring_sound: false
    };
    let ob9 = {
      pipe1entrance: false,
      pipe2entrance: false,
      pipe3entrance: false,
      pipe4entrance: false,
      pipe1exit: false,
      pipe2exit: false,
      pipe3exit: false,
      pipe4exit: false,
      pipe1rolling: false,
      pipe2rolling: false,
      pipe3rolling: false,
      pipe4rolling: false,
      hiddenBall1: {},
      hiddenBall2: {},
      hiddenBall3: {},
      hiddenBall4: {},
      hiddenBall1falling: false,
      hiddenBall2falling: false,
      hiddenBall3falling: false,
      hiddenBall4falling: false,
      plate1: false,
      plate2: false,
      plate3: false,
      plate4: false,
      particle1: false,
      particle2: false,
      particle3: false,
      particle4: false,
      just_accessed: false
    };
    let ob10 = {
      dying: false
    };
    let ob11 = {
      clockwise: false,
      turret_moving: false,
      firing: false,
      rotation: 0,
      impacted: false,
      hit: false,
      powerCrystal1: 100,
      powerCrystal2: 100,
      powerCrystal3: 100,
      powerCrystal4: 100
    };
    let ob12 = {
      clockwise: false,
      mob_moving: false,
      firing: false,
      rotation: 0,
      impacted: false,
      hit: false,
      powerCrystal1: 100,
      powerCrystal2: 100,
      powerCrystal3: 100,
      powerCrystal4: 100
    };
    let ob13 = {
      buttons_remaining: 3,
      pushButton1p13: false,
      pushButton2p13: false,
      pushButton3p13: false,
      green_plate: false,
      red_plate: false,
      blue_plate: false
    };
    let ob14 = {
      ghost_part_counter: 0,
      pouring: true,
      ghost1Barrier: false,
      ghost2Barrier: false,
      ghost3Barrier: false,
      ghost1Barrier_warned: false,
      ghost2Barrier_warned: false,
      ghost3Barrier_warned: false
    };
    let ob15 = {
      warned: false,
      shooting: false,
      bullseye1: false,
      bullseye2: false,
      bullseye3: false,
      bullseye4: false,
      remove: false,
      currently_firing: false
    };
    let ob16 = {
      pushButton1p16: false,
      pushButton2p16: true,
      pushButton3p16: true,
      pushButton4p16: true,
      pushButton5p16: true,
      bulb_counter: 0,
      hint_bulb1: "",
      hint_bulb2: "",
      hint_bulb3: "",
      hint_bulb4: "",
      puzz_bulb1: "",
      puzz_bulb2: "",
      puzz_bulb3: "",
      puzz_bulb4: ""
    };
    let ob17 = {
      liquid_color: ""
    };
    let ob18 = {
      warned: false,
      light_counter: 0,
      sounds: [],
      smachine_one: false,
      smachine_two: false,
      smachine_three: false,
      smachine_four: false,
      smachine_five: false,
      smachine_six: false
    };
    let ob19 = {
      portal_warned: false,
      just_accessed: false,
      holding: "",
      red_deviceOb19: "",
      orange_deviceOb19: "",
      yellow_deviceOb19: "",
      green_deviceOb19: "",
      empty1_deviceOb19: "",
      empty2_deviceOb19: "",
      empty3_deviceOb19: "",
      empty4_deviceOb19: ""
    };
    let ob20 = {
      warned: false,
      ball_phase: "ball1",
      rollingBall: false,
      playing_sound: false,
      rolling_sound: {},
      bulb_colors: [],
      bulb_color: {},
      bulb_counter: 0,
      b2pi1: (Math.PI + 0.5),
      b3pi1: (Math.PI + 2.5),
      b4pi1: (Math.PI + 2.5),
      radius1: 10,
      radius2: 5,
      rate1: 0.2,
      rate2: 0.03
    };
    let current_secret = {
      secret: {}
    };
    let secret_moving = {
      motion: false
    };
    let pressedKeys = {
      w: false,
      s: false,
      a: false,
      d: false
    };

    function noop() {}

    function coin_match_run_hit(hit) {
      placeCoinOb1(hit, this.scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score);
    }

    function coin_match_hcc_oo(obstacle_objects, colMesh) {
      pedestalWarningOb1(obstacle_objects, inventory, ob1, solved, colMesh);
      removeCoinOb1(obstacle_objects, inventory, inventory_tracker, colMesh, this.scene);
    }

    function bulb_match_hcc(colMesh) {
      hintMessageOb2(colMesh, ob2, this.scene, solved);
    }

    function bulb_match_run_hit(hit) {
      pushButtonsOb2(hit, solved, buttons, ob2, this.scene);
    }

    function bulb_match_btn() {
      changeBulbColorOb2(solved, buttons, ob2, obstacle_objects, forcefield_objects, this.scene, score);
    }

    function sphere_agents_run_hit(hit) {
      pushButtonsOb3(hit, solved, buttons, this.scene);
    }

    function sphere_agents_btn() {
      agentSummonsOb3(buttons, ob3, this.scene);
    }

    function sphere_agents_run() {
      agentCollisionsOb3(solved, ob3, obstacle_objects, forcefield_objects, this.scene, score);
    }

    function move_bridges_hcc_oo(obstacle_objects, colMesh) {
      teleportPlayerOb4(obstacle_objects, colMesh, this.camera, this.scene);
    }

    function move_bridges_btn() {
      moveGreenOb4(buttons, ob4);
      moveBlueOb4(buttons, ob4);
      removeBarrierOb4(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
    }

    function move_bridges_run() {
      movingGreenOb4(ob4, this.scene);
      movingBlueOb4(ob4, this.scene);
    }

    function move_bridges_run_hit(hit) {
      pushButtonsOb4(hit, solved, buttons, this.scene);
    }

    function ghost_button_hcc(colMesh) {
      warnMessageOb5(colMesh, ob5, this.scene);
      removeSpearOb5(colMesh, ob5, this.scene, this.camera, player);
    }

    function ghost_button_run_hit(hit) {
      pushButtonsOb5(hit, solved, buttons, this.scene);
    }

    function ghost_button_run() {
      swingSpearOb5(ob5, this.scene, this.camera, solved, player);
      playerHoldingGhostSpearDistanceCheck(obstacle_objects, player, this.camera, this.scene, solved);
    }

    function ghost_button_btn() {
      removeBarrierOb5(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
    }

    function carry_crystals_run_hit(hit) {
      placeCrystalOb6(hit.pickedMesh.name, obstacle_objects, forcefield_objects, this.scene, this.camera, solved, ob6, player, score);
      removeCrystalOb6(hit.pickedMesh.name, obstacle_objects, this.scene, this.camera, solved, ob6, player);
    }

    function enter_hut_hcc(colMesh) {
      warnMessageOb7(colMesh, ob7, this.scene);
      removeSpearOb7(colMesh, ob7, this.scene, this.camera, player);
    }

    function enter_hut_run() {
      swingSpearOb7(ob7, this.scene, this.camera, solved, player);
      playerHoldingHutSpearDistanceCheck(obstacle_objects, player, this.camera, this.scene, solved);
    }

    function enter_hut_run_hit(hit) {
      pushButtonsOb7(hit, solved, buttons, this.scene);
    }

    function enter_hut_btn() {
      removeBarrierOb7(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
    }

    function grow_garden_hcc(colMesh) {
      removeWateringCanOb8(colMesh, this.scene, this.camera, player);
    }

    function grow_garden_run_hit(hit) {
      fillWateringCanOb8(this.scene, solved, hit.pickedMesh.name, ob8, player);
    }

    function grow_garden_run() {
      growPlantOb8(this.scene, this.camera, ob8, solved, obstacle_objects, forcefield_objects, score, player);
      shrinkPlantOb8(this.scene, ob8);
      pourWaterOb8(solved, this.scene, this.camera, ob8, player);
      playerHoldingWateringCanDistanceCheck(obstacle_objects, player, this.camera, this.scene, solved, ob8);
    }

    function down_pipes_hcc_oo(obstacle_objects, colMesh) {
      removeBallOb9(obstacle_objects, inventory, inventory_tracker, colMesh, this.scene);
    }

    function down_pipes_run_hit(hit) {
      dropBallOb9(hit.pickedMesh.name, ob9, solved, inventory, inventory_tracker, this.scene);
      setBallOb9(hit.pickedMesh.name, ob9, solved, inventory, inventory_tracker, this.scene);
      pickUpBallOb9(hit.pickedMesh.name, ob9, solved, inventory, inventory_tracker, this.scene);
    }

    function down_pipes_run() {
      fallingBallOb9(solved, ob9, this.scene, score, obstacle_objects, forcefield_objects);
    }

    function tight_rope_hcc_oo(obstacle_objects, colMesh) {
      climbLadderOb10(obstacle_objects, colMesh, this.camera, this.scene);
      acidDeathOb10(obstacle_objects, colMesh, this.camera, this.scene, ob10, player);
    }

    function tight_rope_run_hit(hit) {
      pushButtonsOb10(hit, solved, buttons, this.scene);
    }

    function tight_rope_btn() {
      removeBarrierOb10(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
    }

    function dodge_turret_run() {
      movementTestOb11(solved, ob11, this.camera, this.scene, score, forcefield_objects, obstacle_objects);
    }

    function dodge_turret_hcc(colMesh) {
      shellsHitPlayerTestOb11(ob11, colMesh, this.scene, this.camera, player, start_pos);
    }

    function mob_shoots_run() {
      movementTestOb12(solved, ob12, this.camera, this.scene, score, forcefield_objects, obstacle_objects);
    }

    function mob_shoots_hcc(colMesh) {
      laserHitPlayerTestOb12(ob12, colMesh, this.scene, this.camera, player, start_pos);
    }

    function powder_pyramid_hcc_oo(obstacle_objects, colMesh) {
      enterExitPyramidOb13(obstacle_objects, colMesh, this.scene, this.camera);
      removePowderOb13(obstacle_objects, inventory, inventory_tracker, colMesh, this.scene);
    }

    function powder_pyramid_run_hit(hit) {
      pushButtonsOb13(hit, solved, buttons, this.scene, ob13);
      placePowderOb13(hit, this.scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score, ob13);
    }

    function powder_pyramid_btn() {
      handleButtonPressOb13(buttons, ob13, obstacle_objects, this.scene);
    }

    function haunted_crypt_hcc(colMesh) {
      warnMessageOb14(colMesh, ob14, this.scene);
    }

    function haunted_crypt_hcc_oo(obstacle_objects, colMesh) {
      enterExitCryptOb14(obstacle_objects, colMesh, this.scene, this.camera);
      removeWaterOb14(obstacle_objects, inventory, inventory_tracker, colMesh, this.scene);
    }

    function haunted_crypt_run_hit(hit) {
      pourWaterOb14(hit, this.scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score, ob14);
    }

    function bulls_eye_hcc(colMesh) {
      warnMessageOb15(colMesh, ob15, this.scene, solved);
      removeBlasterOb15(colMesh, ob15, this.scene, this.camera, player);
    }

    function bulls_eye_hcc_oo(obstacle_objects, colMesh) {
      climbStepOb15(obstacle_objects, colMesh, this.camera, this.scene);
    }

    function bulls_eye_run() {
      shootBlasterOb15(this.scene, this.camera, player, ob15);
      removeBarrierOb15(ob15, solved, obstacle_objects, forcefield_objects, this.scene, score, player);
      playerHoldingBlasterDistanceCheck(obstacle_objects, player, this.camera, this.scene, solved);
    }

    function timed_buttons_run_hit(hit) {
      pushButtonsOb16(hit, solved, buttons, this.scene, ob16);
    }

    function timed_buttons_btn() {
      handleButtonPressOb16(buttons, ob16, this.scene, obstacle_objects, forcefield_objects, score, solved);
    }

    function potion_cauldron_hcc_oo(obstacle_objects, colMesh) {
      removePotionOb17(obstacle_objects, inventory, inventory_tracker, colMesh, this.scene);
    }

    function potion_cauldron_run_hit(hit) {
      pourPotionOb17(hit, this.scene, this.camera, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score, ob17, player);
    }

    function crystal_temple_hcc_oo(obstacle_objects, colMesh) {
      teleportPlayerOb18(obstacle_objects, colMesh, this.camera, this.scene, ob18);
    }

    function crystal_temple_hcc(colMesh) {
      warnMessageOb18(colMesh, ob18, this.scene, solved);
    }

    function crystal_temple_run_hit(hit) {
      activateSoundMachineOb18(hit, solved, ob18, this.scene);
      pushButtonsOb18(hit, solved, buttons, this.scene);
    }

    function crystal_temple_btn() {
      removeBarrierOb18(buttons, solved, obstacle_objects, forcefield_objects, this.scene, score);
    }

    function crystal_shards_hcc_oo(obstacle_objects, colMesh) {
      teleportPlayerOb19(obstacle_objects, colMesh, this.camera, this.scene, player, ob19, pressedKeys);
    }

    function crystal_shards_run_hit(hit) {
      removeCrystalOb19(hit.pickedMesh.name, this.scene, this.camera, solved, ob19, player, obstacle_objects);
      pickUpCrystalOb19(hit.pickedMesh.name, ob19, solved, this.scene, this.camera, player)
      setCrystalOb19(hit.pickedMesh.name, ob19, solved, this.scene, obstacle_objects, forcefield_objects, score, player);
    }

    function rolling_pipes_hcc(colMesh) {
      warnMessageOb20(colMesh, ob20, this.scene, solved);
    }

    function rolling_pipes_run() {
      rollingBallOb20(ob20, this.scene, solved, score, obstacle_objects, forcefield_objects);
    }

    function rolling_pipes_run_hit(hit) {
      pushButtonsOb20(hit, solved, buttons, this.scene, ob20);
    }

    function rolling_pipes_btn() {
      handleButtonPressOb20(buttons, ob20, this.scene, obstacle_objects);
    }

    let puzzles_data = {
      coin_match: {
        hcc: noop,
        hcc_oo: coin_match_hcc_oo.bind(this),
        run: noop,
        run_hit: coin_match_run_hit.bind(this),
        btn: noop
      },
      bulb_match: {
        hcc: bulb_match_hcc.bind(this),
        hcc_oo: noop,
        run: noop,
        run_hit: bulb_match_run_hit.bind(this),
        btn: bulb_match_btn.bind(this)
      },
      sphere_agents: {
        hcc: noop,
        hcc_oo: noop,
        run: sphere_agents_run.bind(this),
        run_hit: sphere_agents_run_hit.bind(this),
        btn: sphere_agents_btn.bind(this)
      },
      move_bridges: {
        hcc: noop,
        hcc_oo: move_bridges_hcc_oo.bind(this),
        run: move_bridges_run.bind(this),
        run_hit: move_bridges_run_hit.bind(this),
        btn: move_bridges_btn.bind(this)
      },
      ghost_button: {
        hcc: ghost_button_hcc.bind(this),
        hcc_oo: noop,
        run: ghost_button_run.bind(this),
        run_hit: ghost_button_run_hit.bind(this),
        btn: ghost_button_btn.bind(this)
      },
      carry_crystals: {
        hcc: noop,
        hcc_oo: noop,
        run: noop,
        run_hit: carry_crystals_run_hit.bind(this),
        btn: noop
      },
      enter_hut: {
        hcc: enter_hut_hcc.bind(this),
        hcc_oo: noop,
        run: enter_hut_run.bind(this),
        run_hit: enter_hut_run_hit.bind(this),
        btn: enter_hut_btn.bind(this)
      },
      grow_garden: {
        hcc: grow_garden_hcc.bind(this),
        hcc_oo: noop,
        run: grow_garden_run.bind(this),
        run_hit: grow_garden_run_hit.bind(this),
        btn: noop
      },
      down_pipes: {
        hcc: noop,
        hcc_oo: down_pipes_hcc_oo.bind(this),
        run: down_pipes_run.bind(this),
        run_hit: down_pipes_run_hit.bind(this),
        btn: noop
      },
      tight_rope: {
        hcc: noop,
        hcc_oo: tight_rope_hcc_oo.bind(this),
        run: noop,
        run_hit: tight_rope_run_hit.bind(this),
        btn: tight_rope_btn.bind(this)
      },
      dodge_turret: {
        hcc: dodge_turret_hcc.bind(this),
        hcc_oo: noop,
        run: dodge_turret_run.bind(this),
        run_hit: noop,
        btn: noop
      },
      mob_shoots: {
        hcc: mob_shoots_hcc.bind(this),
        hcc_oo: noop,
        run: mob_shoots_run.bind(this),
        run_hit: noop,
        btn: noop
      },
      powder_pyramid: {
        hcc: noop,
        hcc_oo: powder_pyramid_hcc_oo.bind(this),
        run: noop,
        run_hit: powder_pyramid_run_hit.bind(this),
        btn: powder_pyramid_btn.bind(this)
      },
      haunted_crypt: {
        hcc: haunted_crypt_hcc.bind(this),
        hcc_oo: haunted_crypt_hcc_oo.bind(this),
        run: noop,
        run_hit: haunted_crypt_run_hit.bind(this),
        btn: noop
      },
      bulls_eye: {
        hcc: bulls_eye_hcc.bind(this),
        hcc_oo: bulls_eye_hcc_oo.bind(this),
        run: bulls_eye_run.bind(this),
        run_hit: noop,
        btn: noop
      },
      timed_buttons: {
        hcc: noop,
        hcc_oo: noop,
        run: noop,
        run_hit: timed_buttons_run_hit.bind(this),
        btn: timed_buttons_btn.bind(this)
      },
      potion_cauldron: {
        hcc: noop,
        hcc_oo: potion_cauldron_hcc_oo.bind(this),
        run: noop,
        run_hit: potion_cauldron_run_hit.bind(this),
        btn: noop
      },
      crystal_temple: {
        hcc: crystal_temple_hcc.bind(this),
        hcc_oo: crystal_temple_hcc_oo.bind(this),
        run: noop,
        run_hit: crystal_temple_run_hit.bind(this),
        btn: crystal_temple_btn.bind(this)
      },
      crystal_shards: {
        hcc: noop,
        hcc_oo: crystal_shards_hcc_oo.bind(this),
        run: noop,
        run_hit: crystal_shards_run_hit.bind(this),
        btn: noop
      },
      rolling_pipes: {
        hcc: rolling_pipes_hcc.bind(this),
        hcc_oo: noop,
        run: rolling_pipes_run.bind(this),
        run_hit: rolling_pipes_run_hit.bind(this),
        btn: rolling_pipes_btn.bind(this)
      }
    };
    function selectLetter(kbInfo, global_keys) {
      if (kbInfo.event.which === global_keys.move_up.code) {
        return global_keys.move_up.default_letter;
      }
      if (kbInfo.event.which === global_keys.move_down.code) {
        return global_keys.move_down.default_letter;
      }
      if (kbInfo.event.which === global_keys.move_left.code) {
        return global_keys.move_left.default_letter;
      }
      if (kbInfo.event.which === global_keys.move_right.code) {
        return global_keys.move_right.default_letter;
      }
    }

    this.scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          if (player.health > 0 && menu_gui.toggle === false) {
            if (kbInfo.event.which === global_keys.move_up.code || kbInfo.event.which === global_keys.move_down.code || kbInfo.event.which === global_keys.move_left.code || kbInfo.event.which === global_keys.move_right.code) {
              if (pressedKeys.w === false || pressedKeys.s === false || pressedKeys.a === false || pressedKeys.d === false) {
                pressedKeys[selectLetter(kbInfo, global_keys)] = true;
                if (player.already_walking === false && player.grounded === true) {
                  player.already_walking = true;
                  if (this.camera.speed > 0) {
                    player.walking_sound = new Sound("Sound", "./sound/sfx_footsteps.wav", this.scene, null, { loop: true, autoplay: true });
                  }
                }
              }
            }
          }
        break;
        case KeyboardEventTypes.KEYUP:
          if (kbInfo.event.which === global_keys.move_up.code || kbInfo.event.which === global_keys.move_down.code || kbInfo.event.which === global_keys.move_left.code || kbInfo.event.which === global_keys.move_right.code) {
            pressedKeys[selectLetter(kbInfo, global_keys)] = false;
            if (pressedKeys.w === false && pressedKeys.s === false && pressedKeys.a === false && pressedKeys.d === false) {
              if (player.walking_sound) {
                player.walking_sound.dispose(true, true);
                player.walking_sound = null;
                player.already_walking = false;
              }
            }
            if (ob11.turret_moving) {
              ob11.turret_moving = false;
            }
            if (ob12.mob_moving) {
              ob12.mob_moving = false;
            }
          }
        break;
      }
    });

    document.addEventListener("mousemove", () => {
    // makes alt-tabbing work as intended
      if (!this.engine.isPointerLock && BrowserWindow.getFocusedWindow()) {
        this.engine.enterPointerlock();
        canvas.focus();
      }
    }, false);
    document.addEventListener("click", () => {
      if (player.holding === "ghostSpear" || player.holding === "hutSpear") {
        player.swing_spear = true;
      }
      if (player.holding === "blasterOb15" && ob15.currently_firing === false) {
        ob15.shooting = true;
        ob15.currently_firing = true;
        setTimeout(() => {
          ob15.currently_firing = false;
        }, 750);
      }
    }, false);
    document.addEventListener("keydown", () => {
    // for pouring water in obstacle 8
      if (event.keyCode === global_keys.action_key.code && ob8.pouring === false && solved.solvedP8 === false && player.holding === "wateringCan") {
        ob8.pouring = true;
        if (ob8.water > 0) {
          ob8.pouring_sound = new Sound("Sound", "./sound/loop_rain.ogg", this.scene, null, { loop: true, autoplay: true });
        }
      }
    }, false);
    document.addEventListener("keyup", () => {
    // for pouring water in obstacle 8
      if (event.keyCode === global_keys.action_key.code && ob8.pouring === true) {
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
        collectTreasure(treasure_objects, treasure_stats, colMesh, score, this.scene);

        switch (map_size.size) {
          case "small":
            puzzles_data[puzzles[0]].hcc(colMesh);
            puzzles_data[puzzles[1]].hcc(colMesh);
          break;
          case "medium":
            puzzles_data[puzzles[0]].hcc(colMesh);
            puzzles_data[puzzles[1]].hcc(colMesh);
            puzzles_data[puzzles[2]].hcc(colMesh);
          break;
          case "large":
            puzzles_data[puzzles[0]].hcc(colMesh);
            puzzles_data[puzzles[1]].hcc(colMesh);
            puzzles_data[puzzles[2]].hcc(colMesh);
            puzzles_data[puzzles[3]].hcc(colMesh);
          break;
        }

      // for obstacle_objects items
        for (let i = 0, length = obstacle_objects.length; i < length; i++) {
          if (colMesh.uniqueId === obstacle_objects[i].id) {
            switch (map_size.size) {
              case "small":
                puzzles_data[puzzles[0]].hcc_oo(obstacle_objects[i], colMesh);
                puzzles_data[puzzles[1]].hcc_oo(obstacle_objects[i], colMesh);
              break;
              case "medium":
                puzzles_data[puzzles[0]].hcc_oo(obstacle_objects[i], colMesh);
                puzzles_data[puzzles[1]].hcc_oo(obstacle_objects[i], colMesh);
                puzzles_data[puzzles[2]].hcc_oo(obstacle_objects[i], colMesh);
              break;
              case "large":
                puzzles_data[puzzles[0]].hcc_oo(obstacle_objects[i], colMesh);
                puzzles_data[puzzles[1]].hcc_oo(obstacle_objects[i], colMesh);
                puzzles_data[puzzles[2]].hcc_oo(obstacle_objects[i], colMesh);
                puzzles_data[puzzles[3]].hcc_oo(obstacle_objects[i], colMesh);
              break;
            }
          }
        }
      }
    }
    handleCameraCollisions();

    let divFps = document.getElementById("fps");
    menu_gui.toggle = false; // make sure this is initially set to false here

    this.scene.executeWhenReady(() => {
      maze.loaded = true;
      runTimer(timer, map_size);
      playMusic(this.scene, sound_track);
      playMenuMusic(this.scene, sound_track, false);
      setMenuBackgroundColors("rgba(128, 0, 0, 0.75)");
      playerHoldingDistanceTest(obstacle_objects, player);
      document.getElementById("loading").style.left = -10000;
      this.engine.runRenderLoop(() => {
        if (menu_gui.toggle === false) {
          divFps.innerHTML = this.engine.getFps().toFixed() + " fps";
          this.scene.render();
        // display the time
          displayTime(timer);
        // for secrets
          moveSecretWall(secret_moving, current_secret, this.scene, secret_data);
        // if they run out of time on a time limit map
          exitMap(null, treasure_stats, secret_data, timer, map_size, this.scene, this.camera, menu_gui, score, sound_track);

          switch (map_size.size) {
            case "small":
              puzzles_data[puzzles[0]].run();
              puzzles_data[puzzles[1]].run();
            break;
            case "medium":
              puzzles_data[puzzles[0]].run();
              puzzles_data[puzzles[1]].run();
              puzzles_data[puzzles[2]].run();
            break;
            case "large":
              puzzles_data[puzzles[0]].run();
              puzzles_data[puzzles[1]].run();
              puzzles_data[puzzles[2]].run();
              puzzles_data[puzzles[3]].run();
            break;
          }

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
                  exitMap(hit, treasure_stats, secret_data, timer, map_size, this.scene, this.camera, menu_gui, score, sound_track, achievements, puzzles, app_data);
                // for discovering secret walls
                  discoverSecret(hit, secret_walls, secret_data, secret_moving, current_secret, score, this.scene);

                  switch (map_size.size) {
                    case "small":
                      puzzles_data[puzzles[0]].run_hit(hit);
                      puzzles_data[puzzles[1]].run_hit(hit);
                    break;
                    case "medium":
                      puzzles_data[puzzles[0]].run_hit(hit);
                      puzzles_data[puzzles[1]].run_hit(hit);
                      puzzles_data[puzzles[2]].run_hit(hit);
                    break;
                    case "large":
                      puzzles_data[puzzles[0]].run_hit(hit);
                      puzzles_data[puzzles[1]].run_hit(hit);
                      puzzles_data[puzzles[2]].run_hit(hit);
                      puzzles_data[puzzles[3]].run_hit(hit);
                    break;
                  }
                }
              }
              this.pressE = false;
            }
            castRay();
          }

          if (buttons.pushingButton !== "") {
            let pushButton = this.scene.getMeshByName(buttons.pushingButton);
            let down_val = 2.9;
            let top_val = 3.25;
          // for different button heights
            if (buttons.pushingButton === "pushButton1p4a" || buttons.pushingButton === "pushButton1p4b" || buttons.pushingButton === "pushButton1p4c" || buttons.pushingButton === "pushButton1p10") {
              down_val = 8.9;
              top_val = 9.25;
            }
            if (buttons.pushingButton === "pushButton1p13" || buttons.pushingButton === "pushButton2p13" || buttons.pushingButton === "pushButton3p13") {
              down_val = -97.1;
              top_val = -96.75;
            }
            if (pushButton.position.y > down_val && buttons.goingDown === true) {
              pushButton.position.y -= 0.01;
            } else if (pushButton.position.y < down_val && buttons.goingDown === true) {
              switch (map_size.size) {
                case "small":
                  puzzles_data[puzzles[0]].btn();
                  puzzles_data[puzzles[1]].btn();
                break;
                case "medium":
                  puzzles_data[puzzles[0]].btn();
                  puzzles_data[puzzles[1]].btn();
                  puzzles_data[puzzles[2]].btn();
                break;
                case "large":
                  puzzles_data[puzzles[0]].btn();
                  puzzles_data[puzzles[1]].btn();
                  puzzles_data[puzzles[2]].btn();
                  puzzles_data[puzzles[3]].btn();
                break;
              }
              buttons.goingDown = false;
            } else if (pushButton.position.y < top_val && buttons.goingDown === false) {
              pushButton.position.y += 0.01;
            } else {
              buttons.goingDown = true
              buttons.pushingButton = "";
              buttons.running = false;
            }
          }
        }
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
