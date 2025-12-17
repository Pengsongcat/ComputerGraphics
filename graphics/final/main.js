import * as THREE from "three";
import { SparkControls, SplatMesh, dyno } from "@sparkjsdev/spark";
import GUI from "lil-gui";
import { createPerlinWaveShader } from "./dynoShader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Spz SplatMesh
const splatMesh = new SplatMesh({
  url: "./spz/World 1.spz"
});
splatMesh.position.set(0, 0, -1.5);
splatMesh.scale.set(0.5, 0.5, 0.5);
scene.add(splatMesh);

// SparkControls
const controls = new SparkControls({ canvas: renderer.domElement });

// Parameters
const params = {
  intensity: 0.8,
  waveFrequency: 1.0,
  waveAmplitute: 0.08,
  waveSpeed: 0.4,
  scaleBlend: 0.5
};

// GUI
const gui = new GUI();
gui.add(params, "intensity", 0, 2, 0.01).onChange(() => splatMesh.updateGenerator());
gui.add(params, "waveFrequency", 0.1, 5, 0.1).onChange(() => splatMesh.updateGenerator());
gui.add(params, "waveAmplitute", 0, 0.3, 0.01).onChange(() => splatMesh.updateGenerator());
gui.add(params, "waveSpeed", 0, 2, 0.01).onChange(() => splatMesh.updateGenerator());
gui.add(params, "scaleBlend", 0, 1, 0.01).onChange(() => splatMesh.updateGenerator());

// Shader
const animateT = dyno.dynoFloat(0);
createPerlinWaveShader(splatMesh, params, animateT);

// Animation loop
let t = 0;
renderer.setAnimationLoop(() => {
  t += 1 / 60;
  animateT.value = t;
  splatMesh.updateVersion();

  controls.update(camera);
  renderer.render(scene, camera);
});

