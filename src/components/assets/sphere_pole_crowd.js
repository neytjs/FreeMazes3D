import {RecastJSPlugin} from "@babylonjs/core/Navigation/Plugins";
import Recast from 'recast-detour';
import {Vector3, Color3} from "@babylonjs/core/Maths/math";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import {TransformNode} from "@babylonjs/core/Meshes";
import {sphere_colors} from "./sphere_pole_colors.js";

var navigationPlugin = {};
async function buildNav() {
  let recast = await Recast();
  navigationPlugin = new RecastJSPlugin(recast);
}
buildNav();

let agent_object = {};

let x = 0;
let z = 0;

let navmeshParameters = {
  cs: 0.2,
  ch: 0.2,
  walkableSlopeAngle: 90,
  walkableHeight: 1.0,
  walkableClimb: 1,
  walkableRadius: 1,
  maxEdgeLen: 12.,
  maxSimplificationError: 1.3,
  minRegionArea: 8,
  mergeRegionArea: 20,
  maxVertsPerPoly: 6,
  detailSampleDist: 6,
  detailSampleMaxError: 1
};

function generateNavMesh(scene) {
  let bigPlatform = scene.getMeshByName("bigPlatform");
  navigationPlugin.createNavMesh([bigPlatform], navmeshParameters);

  x = bigPlatform.position.x;
  z = bigPlatform.position.z;
}

let crowd = {};

function createCrowd(scene) {
  crowd = navigationPlugin.createCrowd(1, 0.1, scene);
}

let agentParams = {
  radius: 1,
  height: 2,
  maxAcceleration: 4.0,
  maxSpeed: 10.0,
  collisionQueryRange: 0.5,
  pathOptimizationRange: 0.0,
  separationWeight: 1.0
};

let agentIndex = {};
let agent_counter = 0;
let sphere_color_counter = -1;

function generateSphere(scene, just_spliced) {
  agent_counter = agent_counter + 1;
  if (agent_counter === 1) {
    if (just_spliced === false) {
      let max = sphere_colors.length;
      sphere_color_counter = (sphere_color_counter + 1) >= max ? 0 : sphere_color_counter + 1;
    }
    if (just_spliced === true && sphere_color_counter === sphere_colors.length) {
      sphere_color_counter = 0;
    }

    let width = 2;
    let agentSphere = Mesh.CreateSphere('mob', 5, 2.5, scene);
    agentSphere.position.y = 4;
    agentSphere.name = "agentSphere";
    let matAgent = new StandardMaterial('mat2', scene);
    matAgent.diffuseColor = sphere_colors[sphere_color_counter].color_code;
    matAgent.specularColor = sphere_colors[sphere_color_counter].color_code;
    matAgent.emissiveColor = sphere_colors[sphere_color_counter].color_code;
    matAgent.ambientColor = sphere_colors[sphere_color_counter].color_code;
    agentSphere.material = matAgent;
    let starPos = navigationPlugin.getRandomPointAround(new Vector3(x, 1, z), 0.5);
    let transform = new TransformNode();
    agentSphere.parent = transform;
    agentIndex = crowd.addAgent(starPos, agentParams, transform);

    agent_object.color = sphere_colors[sphere_color_counter].color_name;
  }
}

function sendAgent(camera) {
// from this equation: https://stackoverflow.com/questions/300871/best-way-to-find-a-point-on-a-circle-closest-to-a-given-point
  let cX = x;
  let cY = z;
  let pX = camera.position.x;
  let pY = camera.position.z;
  let r = 17.5;
  let vX = pX - cX;
  let vY = pY - cY;
  let magV = Math.sqrt((vX * vX + vY * vY), 2);
  let aX = cX + vX / magV * r;
  let aY = cY + vY / magV * r;

  let agents = crowd.getAgents();
  crowd.agentGoto(agents[0], navigationPlugin.getClosestPoint(new Vector3(aX, 1, aY)));
}

function crowdCleanUp(sphere) {
  crowd.removeAgent(sphere);
  sphere.dispose();
  agent_counter = 0;
  agent_object = {};
}

export {generateNavMesh, generateSphere, sendAgent, crowdCleanUp, createCrowd, agent_object};
