import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Simplified noise gradient sphere (more compatible)
const simpleFragmentShader = `
  varying vec2 vUv;
  uniform float u_time;

  // Simplex 3D noise
  vec3 mod289_v3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289_v4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289_v4(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289_v3(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float theta = uv.y * 3.14159;
    float phi = uv.x * 6.28318;
    vec3 pos = vec3(
      sin(theta) * cos(phi),
      sin(theta) * sin(phi),
      cos(theta)
    );
    float n = snoise(pos * 1.5 + u_time * 0.15);
    vec3 purple = vec3(0.486, 0.227, 0.929);
    vec3 violet = vec3(0.545, 0.361, 0.965);
    vec3 color = mix(purple, violet, n * 0.5 + 0.5);
    color += vec3(0.15, 0.05, 0.2) * n;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function Hero() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.offsetWidth || 600;
    const height = container.offsetHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(2.5, 128, 128);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: simpleFragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
      },
    });

    scene.add(new THREE.Mesh(geometry, material));
    camera.position.z = 5;

    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.offsetWidth || 600;
      const h = container.offsetHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      material.uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      data-theme="dark"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Radial gradient overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.3) 0%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        className="section-padding"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 w-full">
          {/* Left content */}
          <div className="w-full lg:w-[45%]">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#8b5cf6',
                marginBottom: '20px',
              }}
            >
              KENYA'S REWARDS PLATFORM
            </p>

            <h1
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              Turn Every Airtime Purchase Into{' '}
              <span style={{ color: '#8b5cf6' }}>Real Rewards</span>
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.65)',
                maxWidth: '480px',
                marginTop: '24px',
              }}
            >
              Mapema transforms your everyday airtime, data, and bill payments into instant cashback and redeemable rewards. Join 50,000+ Kenyans already earning.
            </p>

            <div className="flex flex-wrap gap-4" style={{ marginTop: '40px' }}>
              <a href="#contact" className="pill-btn pill-btn-primary">
                Get Started
              </a>
              <a href="#individuals" className="pill-btn pill-btn-secondary">
                How It Works
              </a>
            </div>

            <div className="flex flex-wrap gap-8" style={{ marginTop: '48px' }}>
              {[
                { label: '50K+ Users' },
                { label: 'KES 2M+ Rewards Paid' },
                { label: '4% Max Cashback' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#7c3aed',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Sphere */}
          <div
            className="w-full lg:w-[55%] relative"
            style={{ minHeight: '400px', height: '50vh' }}
          >
            {/* Glass floating cards */}
            <div
              className="glass-card absolute"
              style={{
                width: '180px',
                height: '110px',
                top: '10%',
                right: '5%',
                padding: '16px',
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                M-PESA
              </span>
              <div className="mt-2 space-y-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      style={{
                        width: '60px',
                        height: '2px',
                        background: 'rgba(255,255,255,0.15)',
                      }}
                    />
                    <div
                      className="rounded-full"
                      style={{
                        width: '6px',
                        height: '6px',
                        background: i === 0 ? '#22c55e' : 'transparent',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="glass-card absolute"
              style={{
                width: '160px',
                height: '100px',
                top: '5%',
                left: '10%',
                padding: '16px',
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                REWARDS
              </span>
              <div className="flex items-end gap-1 mt-3" style={{ height: '40px' }}>
                {[30, 50, 35, 60].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: '8px',
                      height: `${h}px`,
                      background: 'rgba(124,58,237,0.6)',
                      borderRadius: '2px',
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="glass-card absolute"
              style={{
                width: '140px',
                height: '90px',
                bottom: '15%',
                right: '15%',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '32px',
                  color: '#ffffff',
                }}
              >
                4%
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                CASHBACK
              </span>
            </div>

            <div
              className="glass-card absolute"
              style={{
                width: '150px',
                height: '85px',
                bottom: '20%',
                left: '5%',
                padding: '16px',
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '28px',
                  color: '#ffffff',
                }}
              >
                50K+
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                USERS
              </span>
            </div>

            {/* Three.js Sphere Container */}
            <div
              ref={canvasContainerRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '12px',
              background: '#ffffff',
              position: 'absolute',
              animation: 'scrollDot 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(32px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
