import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
  useGLTF,
} from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { X, ChevronRight } from 'lucide-react';

// ─── Preload GLB immediately ──────────────────────────────────────────────────
useGLTF.preload('/ethereum_logo_3d.glb');

// ─── Sparkline data (upward trend) ───────────────────────────────────────────
const sparkData = [
  { v: 8 }, { v: 12 }, { v: 10 }, { v: 17 }, { v: 15 },
  { v: 22 }, { v: 20 }, { v: 28 }, { v: 26 }, { v: 34 },
];

// ─── Skeleton canvas fallback ─────────────────────────────────────────────────
function CanvasSkeleton() {
  return (
    <div
      style={{
        height: '220px',
        width: '100%',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(125,175,114,0.08) 0%, rgba(196,181,253,0.08) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(125,175,114,0.15)',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
    </div>
  );
}

// ─── GLB Crystal model ────────────────────────────────────────────────────────
function CrystalModel({ paused }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/ethereum_logo_3d.glb');

  // mount spring: scale 0 → 1 over 800ms
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { tension: 120, friction: 14, duration: 800 },
  });

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (!paused) {
      groupRef.current.rotation.y += 0.003;
    }
    // gentle float regardless of drag
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.0) * 0.08;
  });

  return (
    <a.group ref={groupRef} scale={scale}>
      <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
    </a.group>
  );
}

// ─── Scene (lights + controls + model) ───────────────────────────────────────
function Scene() {
  const controlsRef = useRef();
  const [paused, setPaused] = useState(false);
  const resumeTimerRef = useRef(null);

  const handleStart = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setPaused(true);
    document.body.style.cursor = 'grabbing';
  }, []);

  const handleEnd = useCallback(() => {
    document.body.style.cursor = 'grab';
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setPaused(false);
      document.body.style.cursor = 'default';
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, 3, 3]} intensity={0.8} color="#7DAF72" />
      <pointLight position={[3, -3, -3]} intensity={0.5} color="#C4B5FD" />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.3}
          scale={4}
          blur={2.5}
          color="#7DAF72"
        />
        <CrystalModel paused={paused} />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </>
  );
}

// ─── ProVersionCard ───────────────────────────────────────────────────────────
function ProVersionCard({ onClose }) {
  const [canvasHovered, setCanvasHovered] = useState(false);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #EEF0F8 0%, #F0F2F5 100%)',
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '460px',
        position: 'relative',
      }}
    >
      {/* ── Top bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span
          style={{
            background: '#ffffff',
            color: '#1A1A1A',
            borderRadius: '999px',
            padding: '5px 14px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          Pro Version
        </span>
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.06)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#6B7280',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
          aria-label="Close Pro Version card"
        >
          <X size={14} />
        </button>
      </div>

      {/* ── 3D Canvas section ── */}
      <div
        style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', flexShrink: 0 }}
      >
        {/* Radial glow behind canvas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(125,175,114,0.12) 0%, transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{ position: 'relative', zIndex: 1, cursor: canvasHovered ? 'grab' : 'default' }}
          onMouseEnter={() => setCanvasHovered(true)}
          onMouseLeave={() => setCanvasHovered(false)}
        >
          <Suspense fallback={<CanvasSkeleton />}>
            <Canvas
              camera={{ position: [0, 0, 4], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{
                height: '220px',
                width: '100%',
                borderRadius: '12px',
                background: 'transparent',
                display: 'block',
              }}
            >
              <Scene />
            </Canvas>
          </Suspense>
        </div>
      </div>

      {/* ── Card content below canvas ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Advantages row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>Advantages</span>
          <span
            style={{
              background: '#F0F566',
              color: '#1A1A1A',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            👑 15 Days
          </span>
        </div>

        {/* Subtitle */}
        <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: 400, marginBottom: '6px' }}>
          Your earnings with the pro version
        </p>

        {/* Sparkline */}
        <div style={{ width: '100%', height: '40px', marginBottom: '12px', marginLeft: '-8px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke="#7DAF72"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Learn more row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', marginTop: 'auto' }}>
          <button
            style={{
              background: '#1A1A1A',
              color: '#ffffff',
              borderRadius: '999px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
              flex: 1,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#333333')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
          >
            Learn more
          </button>
          <button
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#1A1A1A',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#333333')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
            aria-label="Go to Pro Version"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Bottom text */}
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#9CA3AF', fontWeight: 400 }}>
          Join the elite with Pro Version
        </p>
      </div>
    </div>
  );
}

export default React.memo(ProVersionCard);
