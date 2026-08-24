import * as THREE from 'three';

/**
 * Camera Controller for 3D DNA Portfolio
 * Interpolates camera position and lookAt target along a 3D spline mapped to scroll progress,
 * with subtle mouse parallax and inertia damping.
 */
export class CameraController {
  constructor(camera) {
    this.camera = camera;

    // Spline control points mapped along the 8 sections
    // (scrollProgress: 0.0 to 1.0)
    this.waypoints = [
      // 0. Hero (Top)
      { progress: 0.0,  pos: new THREE.Vector3(0, 32, 22),     target: new THREE.Vector3(0, 32, 0) },
      // 1. About Me
      { progress: 0.14, pos: new THREE.Vector3(-6, 12, 18),    target: new THREE.Vector3(2, 12, 0) },
      // 2. Current Studies
      { progress: 0.28, pos: new THREE.Vector3(7, -15, 18),    target: new THREE.Vector3(-2, -15, 0) },
      // 3. Skills
      { progress: 0.42, pos: new THREE.Vector3(-5, -45, 14),   target: new THREE.Vector3(1, -45, 0) },
      // 4. Projects
      { progress: 0.58, pos: new THREE.Vector3(6, -75, 19),    target: new THREE.Vector3(-2, -75, 0) },
      // 5. Certifications
      { progress: 0.72, pos: new THREE.Vector3(-6, -105, 17),  target: new THREE.Vector3(2, -105, 0) },
      // 6. Future Vision
      { progress: 0.86, pos: new THREE.Vector3(0, -135, 15),   target: new THREE.Vector3(0, -131, 0) },
      // 7. Contact (Bottom)
      { progress: 1.0,  pos: new THREE.Vector3(0, -162, 21),   target: new THREE.Vector3(0, -162, 0) }
    ];

    this.currentPos = new THREE.Vector3().copy(this.waypoints[0].pos);
    this.currentTarget = new THREE.Vector3().copy(this.waypoints[0].target);
    this.targetPos = new THREE.Vector3().copy(this.waypoints[0].pos);
    this.lookAtTarget = new THREE.Vector3().copy(this.waypoints[0].target);

    // Mouse Parallax coordinates (-1 to 1)
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.initMouseListener();
  }

  initMouseListener() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Touch support for mobile tilt
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.5;
        this.mouse.targetY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 1.5;
      }
    }, { passive: true });
  }

  /**
   * Samples interpolated camera position and target given normalized scroll progress (0..1)
   */
  sampleWaypoints(progress) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    // Find bounding waypoints
    let idx = 0;
    for (let i = 0; i < this.waypoints.length - 1; i++) {
      if (p >= this.waypoints[i].progress && p <= this.waypoints[i + 1].progress) {
        idx = i;
        break;
      }
    }

    const w1 = this.waypoints[idx];
    const w2 = this.waypoints[Math.min(idx + 1, this.waypoints.length - 1)];

    const span = (w2.progress - w1.progress) || 1;
    const localT = (p - w1.progress) / span;
    // Smooth cubic ease for segment transitions
    const easedT = THREE.MathUtils.smoothstep(localT, 0, 1);

    const interpPos = new THREE.Vector3().lerpVectors(w1.pos, w2.pos, easedT);
    const interpTarget = new THREE.Vector3().lerpVectors(w1.target, w2.target, easedT);

    return { pos: interpPos, target: interpTarget };
  }

  update(delta, scrollProgress = 0) {
    // Interpolate mouse parallax
    this.mouse.x = THREE.MathUtils.lerp(this.mouse.x, this.mouse.targetX, delta * 3.5);
    this.mouse.y = THREE.MathUtils.lerp(this.mouse.y, this.mouse.targetY, delta * 3.5);

    // Calculate base waypoint position from scroll
    const sampled = this.sampleWaypoints(scrollProgress);

    // Add mouse parallax offsets
    const parallaxOffsetX = this.mouse.x * 2.2;
    const parallaxOffsetY = this.mouse.y * 1.8;

    this.targetPos.set(
      sampled.pos.x + parallaxOffsetX,
      sampled.pos.y + parallaxOffsetY,
      sampled.pos.z
    );

    this.lookAtTarget.set(
      sampled.target.x + parallaxOffsetX * 0.4,
      sampled.target.y + parallaxOffsetY * 0.4,
      sampled.target.z
    );

    // Smooth inertia lerp for the actual Three.js camera
    this.currentPos.lerp(this.targetPos, delta * 4.0);
    this.currentTarget.lerp(this.lookAtTarget, delta * 4.0);

    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(this.currentTarget);
  }
}
