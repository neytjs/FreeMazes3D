import {RecastJSPlugin} from "@babylonjs/core/Navigation/Plugins";
import Recast from 'recast-detour';
import {Vector3, Color3} from "@babylonjs/core/Maths/math";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import {TransformNode} from "@babylonjs/core/Meshes";
import {sphere_colors} from "./sphere_pole_colors.js";

var navigationPlugin = new RecastJSPlugin(Recast);

var x = 0;
var z = 0;

var navmeshParameters = {
  cs: 0.75,
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
  let bigPlatformMob = scene.getMeshByName("bigPlatformMob");
  navigationPlugin.createNavMesh([bigPlatformMob], navmeshParameters);

  x = bigPlatformMob.position.x;
  z = bigPlatformMob.position.z;
}

var crowd = {};

function createCrowd(scene) {
  crowd = navigationPlugin.createCrowd(1, 0.1, scene);
}

var agentParams = {
  radius: 1,
  height: 2,
  maxAcceleration: 4.0,
  maxSpeed: 5.0,
  collisionQueryRange: 0.5,
  pathOptimizationRange: 0.0,
  separationWeight: 1.0
};

var agentIndex = {};

function generateMob(scene, x, z) {
  let width = 2;
  let agentMob = scene.getMeshByName("mobOb12");
  agentMob.position.y = 2;
  agentMob.name = "agentMob";
  let starPos = navigationPlugin.getRandomPointAround(new Vector3(x, 1, z), 0.5);
  let transform = new TransformNode();
  agentMob.parent = transform;
  agentIndex = crowd.addAgent(starPos, agentParams, transform);
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

  var agents = crowd.getAgents();
  crowd.agentGoto(agents[0], navigationPlugin.getClosestPoint(new Vector3(aX, 1, aY)));
}

function getAgentPosition(scene) {
  return crowd.getAgentPosition();
}

export {generateNavMesh, generateMob, sendAgent, createCrowd, getAgentPosition};
