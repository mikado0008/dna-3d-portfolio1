import * as THREE from 'three';

/**
 * High-performance Particle & Molecular Dust Field
 * Emits glowing bioinformatics data dust, floating nucleotides, and ambient cyber particles.
 */
export class ParticleSystem {
  constructor(count = 1200, depth = 260) {
    this.group = new THREE.Group();
    this.count = count;
    this.depth = depth;

    this.createBioDust();
    this.createCyberGrid();
    this.createEnergyRings();
  }

  createBioDust() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);
    const sizes = new Float32Array(this.count);
    const speeds = new Float32Array(this.count);

    const colorPalette = [
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0x9d4edd), // Violet
      new THREE.Color(0x0066ff), // Blue
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xffffff)  // White star
    ];

    const radiusSpread = 28;
    const halfDepth = this.depth / 2;

    for (let i = 0; i < this.count; i++) {
      // Cylindrical distribution around the central DNA axis
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * radiusSpread + 4;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const y = (Math.random() * this.depth) - halfDepth;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 3.5 + 1.0;
      speeds[i] = Math.random() * 0.4 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom circular glow texture generated on canvas
    const particleTexture = this.createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    this.points = new THREE.Points(geometry, material);
    this.speeds = speeds;
    this.group.add(this.points);
  }

  createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
    grad.addColorStop(0.6, 'rgba(168, 85, 247, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  createCyberGrid() {
    // Subtle background technological coordinate lines
    const gridGroup = new THREE.Group();
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.08
    });

    const steps = 14;
    const stepDist = this.depth / steps;
    const halfDepth = this.depth / 2;

    for (let i = 0; i <= steps; i++) {
      const y = i * stepDist - halfDepth;
      const ringGeo = new THREE.RingGeometry(22, 22.2, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, gridMat);
      ring.position.y = y;
      gridGroup.add(ring);
    }

    this.group.add(gridGroup);
  }

  createEnergyRings() {
    this.energyRings = [];
    const ringGeo = new THREE.TorusGeometry(8.5, 0.08, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 40 - i * 50;
      ring.rotation.x = Math.PI / 2;
      this.energyRings.push(ring);
      this.group.add(ring);
    }
  }

  update(delta, time, scrollProgress = 0) {
    // Gentle rotation of the whole particle field
    this.group.rotation.y = time * 0.05;

    // Pulse and animate bio dust points
    if (this.points) {
      const positions = this.points.geometry.attributes.position.array;
      const halfDepth = this.depth / 2;

      for (let i = 0; i < this.count; i++) {
        // Vertical upward drift
        positions[i * 3 + 1] += this.speeds[i] * delta * 4.0;

        // Wrap around vertically
        if (positions[i * 3 + 1] > halfDepth) {
          positions[i * 3 + 1] = -halfDepth;
        }

        // Gentle radial wiggle
        positions[i * 3] += Math.sin(time + i) * 0.01;
        positions[i * 3 + 2] += Math.cos(time + i) * 0.01;
      }
      this.points.geometry.attributes.position.needsUpdate = true;
    }

    // Animate energy rings
    if (this.energyRings) {
      this.energyRings.forEach((ring, idx) => {
        ring.rotation.z = time * (0.2 + idx * 0.1);
        ring.scale.setScalar(1 + Math.sin(time * 2 + idx) * 0.05);
      });
    }
  }
}
