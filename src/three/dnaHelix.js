import * as THREE from 'three';

/**
 * Procedural 3D DNA Double Helix Generator
 * Creates an ultra-detailed, high-performance instanced DNA model with glowing rungs,
 * sugar-phosphate backbones, hydrogen bonds, and traveling bioluminescent pulse waves.
 */
export class DNAHelix {
  constructor(options = {}) {
    this.group = new THREE.Group();
    this.options = {
      length: options.length || 240,       // Total vertical height of DNA
      radius: options.radius || 4.2,       // Helix radius
      turns: options.turns || 14,          // Number of full 360-degree helical twists
      numBasePairs: options.numBasePairs || 160, // Number of base pairs along the height
      strandRadius: 0.28,
      nodeRadius: 0.45,
      ...options
    };

    // Color definitions for Base Pairs (A: Cyan, T: Emerald, G: Purple, C: Blue)
    this.colors = {
      strandA: new THREE.Color(0x00f0ff),   // Electric Cyan
      strandB: new THREE.Color(0xa855f7),   // Electric Violet/Purple
      adenine: new THREE.Color(0x00f0ff),   // Cyan
      thymine: new THREE.Color(0x10b981),   // Emerald Green
      guanine: new THREE.Color(0x9d4edd),   // Deep Violet
      cytosine: new THREE.Color(0x0066ff),  // Deep Azure
      hBond: new THREE.Color(0xffffff),     // Pure White Glow
      backbone: new THREE.Color(0x38bdf8)   // Light Cyan
    };

    this.pulseProgress = 0;
    this.targetRotationSpeed = 0.35;
    this.currentRotationSpeed = 0.35;
    this.basePairsData = [];
    this.glowingMeshes = [];

    this.buildHelix();
  }

  buildHelix() {
    const { length, radius, turns, numBasePairs, nodeRadius } = this.options;
    const halfLen = length / 2;

    // Track points along each strand for continuous smooth backbone tubes
    const strandAPoints = [];
    const strandBPoints = [];

    // Pre-calculate positions and complementary base pairs
    const pairsType = [
      { name1: 'A', name2: 'T', col1: this.colors.adenine, col2: this.colors.thymine },
      { name1: 'G', name2: 'C', col1: this.colors.guanine, col2: this.colors.cytosine },
      { name1: 'T', name2: 'A', col1: this.colors.thymine, col2: this.colors.adenine },
      { name1: 'C', name2: 'G', col1: this.colors.cytosine, col2: this.colors.guanine },
    ];

    // Shared Geometries & Materials for maximum performance
    const sphereGeo = new THREE.SphereGeometry(nodeRadius, 24, 24);
    const bondCylinderGeo = new THREE.CylinderGeometry(0.12, 0.12, 1, 12);
    bondCylinderGeo.rotateZ(Math.PI / 2); // Orient along X-axis

    const hBondGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);
    hBondGeo.rotateZ(Math.PI / 2);

    // Instanced Mesh for Backbone Nodes (Strand A & Strand B)
    const totalBackboneNodes = numBasePairs * 2;
    const backboneNodeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    this.backboneInstancedMesh = new THREE.InstancedMesh(sphereGeo, backboneNodeMat, totalBackboneNodes);
    this.backboneInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Materials for nucleotide rungs
    const nucleotideMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.2,
      metalness: 0.5,
      clearcoat: 0.8,
      emissiveIntensity: 0.8
    });

    // Base pair rungs group
    this.rungsGroup = new THREE.Group();
    const dummy = new THREE.Object3D();

    let nodeIdx = 0;

    for (let i = 0; i < numBasePairs; i++) {
      const t = i / (numBasePairs - 1);
      const y = (1 - t) * length - halfLen; // from top to bottom
      const angle = t * turns * Math.PI * 2;

      // Authentic minor/major groove angular separation (approx 140 deg / 2.44 rad)
      const angleA = angle;
      const angleB = angle + Math.PI;

      const pAx = Math.cos(angleA) * radius;
      const pAz = Math.sin(angleA) * radius;

      const pBx = Math.cos(angleB) * radius;
      const pBz = Math.sin(angleB) * radius;

      const posA = new THREE.Vector3(pAx, y, pAz);
      const posB = new THREE.Vector3(pBx, y, pBz);

      strandAPoints.push(posA);
      strandBPoints.push(posB);

      // 1. Position Backbone Nodes on Strand A
      dummy.position.copy(posA);
      dummy.scale.setScalar(1.0);
      dummy.updateMatrix();
      this.backboneInstancedMesh.setMatrixAt(nodeIdx, dummy.matrix);
      this.backboneInstancedMesh.setColorAt(nodeIdx, this.colors.strandA);
      nodeIdx++;

      // 2. Position Backbone Nodes on Strand B
      dummy.position.copy(posB);
      dummy.scale.setScalar(1.0);
      dummy.updateMatrix();
      this.backboneInstancedMesh.setMatrixAt(nodeIdx, dummy.matrix);
      this.backboneInstancedMesh.setColorAt(nodeIdx, this.colors.strandB);
      nodeIdx++;

      // 3. Build Base Pair Rung
      const pairInfo = pairsType[i % pairsType.length];
      const rungGroup = new THREE.Group();
      rungGroup.position.set(0, y, 0);

      // Midpoint & direction
      const dir = new THREE.Vector3().subVectors(posB, posA).normalize();
      const rungLength = posA.distanceTo(posB);
      const halfRung = rungLength / 2;

      // Left Base Rung Mesh (Side A)
      const leftBaseMat = nucleotideMat.clone();
      leftBaseMat.color = pairInfo.col1;
      leftBaseMat.emissive = pairInfo.col1;
      leftBaseMat.emissiveIntensity = 0.5;

      const leftRung = new THREE.Mesh(bondCylinderGeo, leftBaseMat);
      const leftLen = halfRung * 0.85;
      leftRung.scale.set(leftLen, 1, 1);
      leftRung.position.set((pAx + 0) / 2, 0, (pAz + 0) / 2);
      leftRung.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir.clone().negate());

      // Right Base Rung Mesh (Side B)
      const rightBaseMat = nucleotideMat.clone();
      rightBaseMat.color = pairInfo.col2;
      rightBaseMat.emissive = pairInfo.col2;
      rightBaseMat.emissiveIntensity = 0.5;

      const rightRung = new THREE.Mesh(bondCylinderGeo, rightBaseMat);
      const rightLen = halfRung * 0.85;
      rightRung.scale.set(rightLen, 1, 1);
      rightRung.position.set((pBx + 0) / 2, 0, (pBz + 0) / 2);
      rightRung.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);

      // Central Hydrogen Bond (White Glowing Bridge)
      const hBondMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9
      });
      const hBond = new THREE.Mesh(hBondGeo, hBondMat);
      hBond.scale.set(halfRung * 0.35, 1, 1);
      hBond.position.set(0, 0, 0);
      hBond.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);

      // Nucleotide Node Spheres
      const nucSphereA = new THREE.Mesh(sphereGeo, leftBaseMat);
      nucSphereA.scale.setScalar(0.7);
      nucSphereA.position.set(pAx * 0.5, 0, pAz * 0.5);

      const nucSphereB = new THREE.Mesh(sphereGeo, rightBaseMat);
      nucSphereB.scale.setScalar(0.7);
      nucSphereB.position.set(pBx * 0.5, 0, pBz * 0.5);

      rungGroup.add(leftRung);
      rungGroup.add(rightRung);
      rungGroup.add(hBond);
      rungGroup.add(nucSphereA);
      rungGroup.add(nucSphereB);

      this.rungsGroup.add(rungGroup);

      this.basePairsData.push({
        y,
        group: rungGroup,
        leftMat: leftBaseMat,
        rightMat: rightBaseMat,
        hBondMat: hBondMat,
        baseA: pairInfo.name1,
        baseB: pairInfo.name2,
        initialY: y
      });
    }

    this.backboneInstancedMesh.instanceMatrix.needsUpdate = true;
    if (this.backboneInstancedMesh.instanceColor) {
      this.backboneInstancedMesh.instanceColor.needsUpdate = true;
    }

    // 4. Create Continuous Smooth Tube Backbones
    const curveA = new THREE.CatmullRomCurve3(strandAPoints);
    const curveB = new THREE.CatmullRomCurve3(strandBPoints);

    const tubeGeoA = new THREE.TubeGeometry(curveA, numBasePairs * 4, this.options.strandRadius, 12, false);
    const tubeGeoB = new THREE.TubeGeometry(curveB, numBasePairs * 4, this.options.strandRadius, 12, false);

    const tubeMatA = new THREE.MeshPhysicalMaterial({
      color: 0x00aaff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.85
    });

    const tubeMatB = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea,
      emissive: 0xa855f7,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.85
    });

    this.tubeA = new THREE.Mesh(tubeGeoA, tubeMatA);
    this.tubeB = new THREE.Mesh(tubeGeoB, tubeMatB);

    // Assemble everything into the main DNA group
    this.group.add(this.backboneInstancedMesh);
    this.group.add(this.tubeA);
    this.group.add(this.tubeB);
    this.group.add(this.rungsGroup);

    // Add glowing ambient point lights attached to the DNA
    this.addInternalLighting();
  }

  addInternalLighting() {
    this.light1 = new THREE.PointLight(0x00f0ff, 3, 25);
    this.light1.position.set(0, 30, 0);
    this.group.add(this.light1);

    this.light2 = new THREE.PointLight(0xa855f7, 3, 25);
    this.light2.position.set(0, -30, 0);
    this.group.add(this.light2);

    this.light3 = new THREE.PointLight(0x00ffaa, 2.5, 25);
    this.light3.position.set(0, -90, 0);
    this.group.add(this.light3);
  }

  /**
   * Updates DNA animation on each frame
   * @param {number} delta - Time elapsed in seconds
   * @param {number} time - Total elapsed time
   * @param {number} scrollProgress - Normalized scroll progress (0 to 1)
   */
  update(delta, time, scrollProgress = 0) {
    // Smooth rotation interpolation
    this.currentRotationSpeed = THREE.MathUtils.lerp(
      this.currentRotationSpeed,
      this.targetRotationSpeed,
      delta * 3
    );

    // Continuous idle rotation plus scroll progression
    this.group.rotation.y += delta * this.currentRotationSpeed;

    // Gentle organic vertical floating
    this.group.position.x = Math.sin(time * 0.6) * 0.4;
    this.group.position.z = Math.cos(time * 0.5) * 0.4;

    // Traveling bioluminescent energy pulse along base pairs
    const pulseSpeed = 1.8;
    const pulsePos = ((time * pulseSpeed) % 1.0); // 0 to 1
    const totalPairs = this.basePairsData.length;
    const activeIndex = Math.floor(pulsePos * totalPairs);

    for (let i = 0; i < totalPairs; i++) {
      const dist = Math.abs(i - activeIndex);
      const intensity = Math.max(0, 1 - dist / 8); // Spread glow over 8 rungs

      const baseIntensity = 0.5;
      const boost = intensity * 1.5;

      this.basePairsData[i].leftMat.emissiveIntensity = baseIntensity + boost;
      this.basePairsData[i].rightMat.emissiveIntensity = baseIntensity + boost;
      this.basePairsData[i].hBondMat.opacity = 0.8 + intensity * 0.2;
    }

    // Move internal lights along with scroll
    const currentY = (0.5 - scrollProgress) * this.options.length;
    if (this.light1) this.light1.position.y = currentY + 15;
    if (this.light2) this.light2.position.y = currentY - 15;
  }

  /**
   * Supercharge DNA energy (for Section 8: Future Goals)
   */
  setEnergyState(isSupercharged) {
    const targetEmissive = isSupercharged ? 1.6 : 0.7;
    const targetSpeed = isSupercharged ? 0.8 : 0.35;

    this.tubeA.material.emissiveIntensity = targetEmissive;
    this.tubeB.material.emissiveIntensity = targetEmissive;
    this.targetRotationSpeed = targetSpeed;
  }
}
