import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {C, FONT} from "./theme";

export const useFade = (dur: number, inF = 20, outF = 20) => {
  const f = useCurrentFrame();
  return interpolate(f, [0, inF, dur - outF, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useAppear = (delay: number) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping: 200}});
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 0.3) % 80;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${C.bg2} 0%, ${C.bg} 70%)`,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line}55 1px, transparent 1px), linear-gradient(90deg, ${C.line}55 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: `${shift}px ${shift}px`,
          opacity: 0.35,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Siluet V-1 (tampak samping, hidung ke kanan). Ukuran sekitar 380 x 135.
export const V1Shape: React.FC<{propAngle?: number; fill?: string}> = ({
  propAngle = 0,
  fill = C.ink,
}) => (
  <g>
    {/* mesin pulsejet di atas bagian belakang */}
    <path d="M60 30 L250 22 L264 30 L264 40 L250 48 L60 44 Z" fill={fill} opacity={0.92} />
    <rect x="140" y="44" width="12" height="20" fill={fill} />
    <rect x="215" y="44" width="12" height="20" fill={fill} />
    {/* sirip ekor */}
    <polygon points="10,64 66,64 54,32 28,32" fill={fill} />
    {/* badan */}
    <path
      d="M10 72 Q10 64 40 62 L300 62 Q345 66 360 80 Q345 94 300 98 L40 98 Q10 96 10 88 Z"
      fill={fill}
    />
    {/* sayap */}
    <polygon points="160,96 228,96 216,132 172,132" fill={fill} opacity={0.85} />
    {/* baling-baling hidung */}
    <g transform={`translate(364 80) rotate(${propAngle})`}>
      <rect x="-2" y="-17" width="4" height="34" fill={C.accent} />
      <rect x="-17" y="-2" width="34" height="4" fill={C.accent} />
    </g>
  </g>
);

type ShellProps = {
  dur: number;
  label: string;
  title: string;
  points: string[];
  children: React.ReactNode;
};

// Tata letak standar: judul + poin kunci di kiri, visual di kanan.
export const SceneShell: React.FC<ShellProps> = ({dur, label, title, points, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const op = useFade(dur);
  const t = spring({frame: frame - 8, fps, config: {damping: 200}});
  const start = 70;
  const step = Math.floor((dur - start - 90) / Math.max(points.length, 1));

  return (
    <AbsoluteFill style={{opacity: op, fontFamily: FONT}}>
      <div style={{position: "absolute", left: 110, top: 120, width: 760}}>
        <div style={{color: C.accent, fontSize: 28, letterSpacing: 8, fontWeight: 700, opacity: t}}>
          {label}
        </div>
        <div
          style={{
            color: C.ink,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 20,
            opacity: t,
            transform: `translateY(${(1 - t) * 30}px)`,
          }}
        >
          {title}
        </div>
        <div style={{width: 120 * t, height: 6, background: C.accent, marginTop: 32}} />
        <div style={{marginTop: 40}}>
          {points.map((p, i) => {
            const a = spring({frame: frame - (start + i * step), fps, config: {damping: 200}});
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  marginBottom: 24,
                  opacity: a,
                  transform: `translateX(${(1 - a) * -40}px)`,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    marginTop: 14,
                    background: C.accent,
                    flexShrink: 0,
                    transform: "rotate(45deg)",
                  }}
                />
                <div style={{color: C.ink, fontSize: 34, lineHeight: 1.3}}>{p}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{position: "absolute", left: 960, top: 90, width: 900, height: 900}}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
