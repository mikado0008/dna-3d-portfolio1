import * as THREE from 'three';
import { DNAHelix } from './dnaHelix.js';
import { ParticleSystem } from './particleSystem.js';
import { CameraController } from './cameraController.js';

/**
 * Master 3D WebGL Scene Manager
 * Controls the Three.js rendering pipeline, lighting, materials, and updates.
 */
export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scrollProgress = 0;
    this.clock = new THREE.Clock();

    this.initScene();
    this.initLighting();
    this.initObjects();
    this.initEventListeners();
    this.animate = this.animate.bind(this);

    requestAnimationFrame(this.animate);
  }

  initScene() {
    // 1. Create Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.012);

    // 2. Create Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(52, aspect, 0.1, 800);
    this.camera.position.set(0, 32, 22);

    // 3. Create WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
      stencil: false,
      depth: true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
  }

  initLighting() {
    // Ambient illumination (deep cosmic navy)
    const ambientLight = new THREE.AmbientLight(0x081b33, 2.5);
    this.scene.add(ambientLight);

    // Hemisphere light for top/bottom subtle gradient
    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x581c87, 1.8);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    // Primary Cyan Key Light
    this.keyLight = new THREE.DirectionalLight(0x00f0ff, 3.5);
    this.keyLight.position.set(20, 40, 25);
    this.scene.add(this.keyLight);

    // Secondary Purple Fill / Rim Light
    this.fillLight = new THREE.DirectionalLight(0xa855f7, 3.0);
    this.fillLight.position.set(-20, -20, 20);
    this.scene.add(this.fillLight);

    // Deep Azure Backlight for 3D rim glow
    const backLight = new THREE.DirectionalLight(0x0066ff, 2.2);
    backLight.position.set(0, 20, -30);
    this.scene.add(backLight);
  }

  initObjects() {
    // 1. Procedural 3D DNA Double Helix
    this.dna = new DNAHelix({
      length: 260,
      radius: 4.2,
      turns: 15,
      numBasePairs: 160
    });
    this.scene.add(this.dna.group);

    // 2. Molecular Particle System & Bio-Dust
    this.particles = new ParticleSystem(1400, 280);
    this.scene.add(this.particles.group);

    // 3. Camera Controller
    this.cameraController = new CameraController(this.camera);
  }

  initEventListeners() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  setScrollProgress(progress) {
    this.scrollProgress = progress;

    // Trigger supercharged state when reaching Section 8 (Future Goals: ~0.82 to 0.94)
    if (progress > 0.82 && progress < 0.96) {
      this.dna.setEnergyState(true);
    } else {
      this.dna.setEnergyState(false);
    }
  }

  animate() {
    requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Update DNA animation & traveling pulse
    if (this.dna) {
      this.dna.update(delta, elapsedTime, this.scrollProgress);
    }

    // 2. Update particle field
    if (this.particles) {
      this.particles.update(delta, elapsedTime, this.scrollProgress);
    }

    // 3. Update Camera Spline & Parallax
    if (this.cameraController) {
      this.cameraController.update(delta, this.scrollProgress);
    }

    // 4. Render 3D Frame
    this.renderer.render(this.scene, this.camera);
  }
}
