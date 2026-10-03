import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { scene as sceneState } from '../lib/scene';

// Brand palette for the field, plus pipeline stage colors for the agent network.
const PALETTE = ['#22d3ee', '#3b82f6', '#8b5cf6', '#06b6d4', '#a5f3fc'];
const STAGE = ['#ff6b6b', '#f7b955', '#4fd8c4', '#5ea8ff', '#b18cff', '#5bdb86'];

// Per-scene layout: [x, y, scale, opacity, tiltX, spin]
const LAYOUT = [
  [1.6, 0.1, 1.05, 1, 0.25, 1], // 0 hero: galaxy sphere
  [0, -1.5, 1, 0.55, -0.55, 0], // 1 story: wave field
  [0, 0.15, 0.82, 0.7, 0, 0], // 2 agents: pipeline network
  [2.4, 0, 1, 0.42, 0.15, 1], // 3 record: double helix
  [0, 0, 0.95, 0.85, 0.35, 1], // 4 contact: torus knot
];

const gauss = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

function buildShapes(N) {
  const A = new Float32Array(N * 3);
  const B = new Float32Array(N * 3);
  const C = new Float32Array(N * 3);
  const D = new Float32Array(N * 3);
  const E = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const net = new Float32Array(N * 3);
  const rnd = new Float32Array(N);
  const c = new THREE.Color();
  const c2 = new THREE.Color();

  const centers = Array.from({ length: 6 }, (_, k) => [-5 + k * 2, 0.55 * Math.sin(k * 1.25), 0.5 * Math.cos(k * 0.9)]);
  const hub = [0, 2.35, -0.6];

  for (let i = 0; i < N; i++) {
    const i3 = i * 3;
    const r = Math.random();
    rnd[i] = r;

    // A: galaxy sphere — bright shell with a soft core and a thin ring
    {
      let x = gauss();
      let y = gauss();
      let z = gauss();
      const len = Math.hypot(x, y, z) || 1;
      x /= len;
      y /= len;
      z /= len;
      const t = Math.random();
      let rad;
      if (t < 0.68) rad = 2.0 + gauss() * 0.05;
      else if (t < 0.86) rad = Math.cbrt(Math.random()) * 1.7;
      else {
        const a = Math.random() * Math.PI * 2;
        const rr = 3.1 + gauss() * 0.18;
        A[i3] = Math.cos(a) * rr;
        A[i3 + 1] = gauss() * 0.04 + Math.sin(a) * rr * 0.22;
        A[i3 + 2] = Math.sin(a) * rr;
        rad = null;
      }
      if (rad !== null) {
        A[i3] = x * rad;
        A[i3 + 1] = y * rad;
        A[i3 + 2] = z * rad;
      }
    }

    // B: wave field
    {
      const x = (Math.random() - 0.5) * 13;
      const z = (Math.random() - 0.5) * 7;
      B[i3] = x;
      B[i3 + 1] = 0.38 * Math.sin(x * 1.05) + 0.26 * Math.cos(z * 1.6 + x * 0.45);
      B[i3 + 2] = z;
    }

    // C: agent network — six stage clusters on a chain, orchestrator hub with spokes
    {
      const t = Math.random();
      if (t < 0.5) {
        const k = Math.floor(Math.random() * 6);
        const s = 0.34;
        C[i3] = centers[k][0] + gauss() * s;
        C[i3 + 1] = centers[k][1] + gauss() * s;
        C[i3 + 2] = centers[k][2] + gauss() * s;
        c.set(STAGE[k]);
      } else if (t < 0.74) {
        const k = Math.floor(Math.random() * 5);
        const f = Math.random();
        const a = centers[k];
        const b = centers[k + 1];
        C[i3] = a[0] + (b[0] - a[0]) * f + gauss() * 0.03;
        C[i3 + 1] = a[1] + (b[1] - a[1]) * f + gauss() * 0.03;
        C[i3 + 2] = a[2] + (b[2] - a[2]) * f + gauss() * 0.03;
        c.set(STAGE[k]).lerp(c2.set(STAGE[k + 1]), f);
      } else if (t < 0.84) {
        C[i3] = hub[0] + gauss() * 0.28;
        C[i3 + 1] = hub[1] + gauss() * 0.28;
        C[i3 + 2] = hub[2] + gauss() * 0.28;
        c.set('#e9f6ff');
      } else {
        const k = Math.floor(Math.random() * 6);
        const f = Math.random();
        const a = centers[k];
        C[i3] = hub[0] + (a[0] - hub[0]) * f + gauss() * 0.02;
        C[i3 + 1] = hub[1] + (a[1] - hub[1]) * f + gauss() * 0.02;
        C[i3 + 2] = hub[2] + (a[2] - hub[2]) * f + gauss() * 0.02;
        c.set('#e9f6ff').lerp(c2.set(STAGE[k]), f);
        c.multiplyScalar(0.7);
      }
      net[i3] = c.r;
      net[i3 + 1] = c.g;
      net[i3 + 2] = c.b;
    }

    // D: double helix with rungs
    {
      const t = Math.random();
      if (t < 0.8) {
        const u = Math.random();
        const strand = Math.random() < 0.5 ? 0 : Math.PI;
        const ang = u * Math.PI * 6 + strand;
        D[i3] = Math.cos(ang) * 1.35 + gauss() * 0.06;
        D[i3 + 1] = (u - 0.5) * 7.5 + gauss() * 0.04;
        D[i3 + 2] = Math.sin(ang) * 1.35 + gauss() * 0.06;
      } else {
        const rung = Math.floor(Math.random() * 42) / 42;
        const ang = rung * Math.PI * 6;
        const f = Math.random() * 2 - 1;
        D[i3] = Math.cos(ang) * 1.35 * f;
        D[i3 + 1] = (rung - 0.5) * 7.5;
        D[i3 + 2] = Math.sin(ang) * 1.35 * f;
      }
    }

    // E: torus knot (2,3)
    {
      const u = Math.random() * Math.PI * 2;
      const rr = Math.cos(3 * u) + 2.2;
      const s = 0.82;
      E[i3] = (rr * Math.cos(2 * u) + gauss() * 0.13) * s;
      E[i3 + 1] = (rr * Math.sin(2 * u) + gauss() * 0.13) * s;
      E[i3 + 2] = (-Math.sin(3 * u) * 1.1 + gauss() * 0.13) * s;
    }

    // Base color
    if (Math.random() < 0.05) c.set('#ffffff');
    else c.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
    col[i3] = c.r;
    col[i3 + 1] = c.g;
    col[i3 + 2] = c.b;
  }
  return { A, B, C, D, E, col, net, rnd };
}

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uP;
  uniform float uSize;
  uniform float uPR;
  uniform float uAspect;
  uniform float uMouseF;
  uniform vec2 uMouse;
  attribute vec3 pB;
  attribute vec3 pC;
  attribute vec3 pD;
  attribute vec3 pE;
  attribute vec3 aCol;
  attribute vec3 aNet;
  attribute float aRand;
  varying vec3 vCol;
  varying float vA;

  float stage(float k) {
    return smoothstep(0.0, 1.0, clamp((uP - k) * 1.3 - aRand * 0.3, 0.0, 1.0));
  }

  void main() {
    float s0 = stage(0.0);
    float s1 = stage(1.0);
    float s2 = stage(2.0);
    float s3 = stage(3.0);
    vec3 p = position;
    p = mix(p, pB, s0);
    p = mix(p, pC, s1);
    p = mix(p, pD, s2);
    p = mix(p, pE, s3);

    float waveW = s0 * (1.0 - s1);
    p.y += waveW * 0.22 * sin(p.x * 1.3 + uTime * 1.1) * cos(p.z * 1.05 + uTime * 0.7);

    // Particles scatter mid-morph, then settle.
    float scatter = 0.0;
    scatter += s0 * (1.0 - s0) + s1 * (1.0 - s1) + s2 * (1.0 - s2) + s3 * (1.0 - s3);
    vec3 dir = normalize(vec3(sin(aRand * 91.0), cos(aRand * 57.0), sin(aRand * 23.0)) + 0.0001);
    p += dir * scatter * 1.6;

    p += 0.035 * vec3(sin(uTime * 0.6 + aRand * 50.0), cos(uTime * 0.5 + aRand * 70.0), sin(uTime * 0.4 + aRand * 90.0));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = ndc - uMouse;
    d.x *= uAspect;
    float dist = length(d);
    float f = smoothstep(0.34, 0.0, dist) * uMouseF;
    mv.xy += normalize(d + 0.0001) * f * (-mv.z) * 0.09;
    gl_Position = projectionMatrix * mv;

    float netW = s1 * (1.0 - s2);
    vCol = mix(aCol, aNet, netW) + f * 0.55;
    vA = 0.45 + 0.55 * aRand;
    gl_PointSize = uSize * (0.45 + aRand * 0.95) * uPR * (6.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vCol;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.5);
    gl_FragColor = vec4(vCol * 1.5, a * vA * uOpacity);
  }
`;

export default function Particles() {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const small = window.innerWidth < 768;
    const N = small ? 11000 : 30000;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return undefined;
    }
    const pr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(pr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    const s = buildShapes(N);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(s.A, 3));
    geo.setAttribute('pB', new THREE.BufferAttribute(s.B, 3));
    geo.setAttribute('pC', new THREE.BufferAttribute(s.C, 3));
    geo.setAttribute('pD', new THREE.BufferAttribute(s.D, 3));
    geo.setAttribute('pE', new THREE.BufferAttribute(s.E, 3));
    geo.setAttribute('aCol', new THREE.BufferAttribute(s.col, 3));
    geo.setAttribute('aNet', new THREE.BufferAttribute(s.net, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(s.rnd, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

    const uniforms = {
      uTime: { value: 0 },
      uP: { value: 0 },
      uSize: { value: small ? 5.2 : 4.6 },
      uPR: { value: pr },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uMouseF: { value: 0 },
      uOpacity: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const mouse = { x: 9, y: 9, tx: 9, ty: 9, active: 0 };
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.active = 1;
    };
    const onLeave = () => {
      mouse.active = 0;
    };
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uAspect.value = w / h;
    };
    window.addEventListener('resize', onResize);

    let lastT = performance.now();
    const t0 = lastT;
    let raf;
    let spin = 0;
    const cur = { x: 0, y: 0, s: 1, o: 0, tilt: 0 };
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      const nowT = performance.now();
      const dt = Math.min((nowT - lastT) / 1000, 0.05);
      lastT = nowT;
      const t = (nowT - t0) / 1000;
      if (!reduce) uniforms.uTime.value = t;

      const target = sceneState.target;
      uniforms.uP.value = lerp(uniforms.uP.value, target, reduce ? 0.2 : 0.035);

      const idx = Math.round(uniforms.uP.value);
      const L = LAYOUT[Math.max(0, Math.min(LAYOUT.length - 1, idx))];
      const narrow = camera.aspect < 0.9;
      const fit = narrow ? Math.max(0.5, camera.aspect * 0.78) : 1;
      cur.x = lerp(cur.x, narrow ? 0 : L[0], 0.04);
      cur.y = lerp(cur.y, L[1], 0.04);
      cur.s = lerp(cur.s, L[2] * fit, 0.04);
      cur.o = lerp(cur.o, sceneState.ready ? L[3] : 0, 0.03);
      cur.tilt = lerp(cur.tilt, L[4], 0.04);

      group.position.set(cur.x, cur.y, 0);
      group.scale.setScalar(cur.s);
      uniforms.uOpacity.value = cur.o;

      if (L[5]) {
        if (!reduce) spin += dt * 0.12;
        group.rotation.y = spin;
      } else {
        const base = Math.round(spin / (Math.PI * 2)) * Math.PI * 2;
        spin = lerp(spin, base, 0.03);
        group.rotation.y = spin + (reduce ? 0 : Math.sin(t * 0.25) * 0.18);
      }
      group.rotation.x = lerp(group.rotation.x, cur.tilt + (fine ? mouse.y * -0.12 : 0), 0.05);

      mouse.x = lerp(mouse.x, mouse.tx, 0.12);
      mouse.y = lerp(mouse.y, mouse.ty, 0.12);
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      uniforms.uMouseF.value = lerp(uniforms.uMouseF.value, fine && !reduce ? mouse.active : 0, 0.06);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="field" ref={mount} aria-hidden="true" />;
}
