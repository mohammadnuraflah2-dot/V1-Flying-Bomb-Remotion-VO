import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {C, FONT} from "./theme";
import {SceneShell, V1Shape, useAppear, useFade} from "./components";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

/* ---------- Kartu judul ---------- */
export const SceneTitle: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const op = useFade(dur, 15, 25);
  const a = spring({frame: f - 10, fps, config: {damping: 200}});
  const x = interpolate(f, [0, dur], [-500, 2300]);
  return (
    <AbsoluteFill
      style={{opacity: op, fontFamily: FONT, justifyContent: "center", alignItems: "center"}}
    >
      <svg style={{position: "absolute", left: 0, top: 0}} width={1920} height={1080} viewBox="0 0 1920 1080">
        <g transform={`translate(${x} 800) scale(1.2)`} opacity={0.5}>
          <V1Shape propAngle={f * 30} fill={C.dim} />
        </g>
      </svg>
      <div style={{color: C.accent, fontSize: 32, letterSpacing: 14, fontWeight: 700, opacity: a}}>
        PERANG DUNIA II · 1944
      </div>
      <div
        style={{
          color: C.ink,
          fontSize: 150,
          fontWeight: 900,
          letterSpacing: 6,
          marginTop: 20,
          opacity: a,
          transform: `scale(${0.95 + 0.05 * a})`,
        }}
      >
        V-1 FLYING BOMB
      </div>
      <div style={{color: C.dim, fontSize: 44, marginTop: 16, opacity: a}}>
        Pesawat tanpa pilot dari Jerman Nazi
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Pembukaan: langit London ---------- */
const SkyVisual: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const s = 1.4;
  const x = interpolate(f, [120, dur - 60], [-520, 1000], clamp);
  const y = 330 + Math.sin(f / 40) * 8;
  const heights = [60, 110, 80, 150, 95, 70, 130, 90, 170, 85, 100, 120, 75, 140, 90];
  return (
    <svg viewBox="0 0 900 900" width={900} height={900}>
      <circle cx={720} cy={170} r={70} fill={C.ink} opacity={0.12} />
      {[0, 1].map((k) => {
        const sway = Math.sin(f / 50 + k * 2) * 90;
        const x0 = 220 + k * 420;
        return (
          <polygon
            key={k}
            points={`${x0},800 ${x0 - 40 + sway},0 ${x0 + 40 + sway},0`}
            fill={C.ink}
            opacity={0.06}
          />
        );
      })}
      {[0, 1, 2].map((k) => {
        const t = ((f + k * 20) % 60) / 60;
        return (
          <circle
            key={k}
            cx={x + 60 * s}
            cy={y + 35 * s}
            r={t * 90}
            fill="none"
            stroke={C.accent}
            strokeWidth={3}
            opacity={(1 - t) * 0.6}
          />
        );
      })}
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <V1Shape propAngle={f * 30} />
      </g>
      {heights.map((h, i) => (
        <rect key={i} x={i * 60} y={800 - h * 1.2} width={54} height={h * 1.2 + 120} fill="#080b11" />
      ))}
      <text
        x={450}
        y={862}
        textAnchor="middle"
        fill={C.dim}
        fontSize={26}
        letterSpacing={8}
        fontFamily={FONT}
      >
        LONDON · JUNI 1944
      </text>
    </svg>
  );
};

export const SceneOpening: React.FC<{dur: number}> = ({dur}) => (
  <SceneShell
    dur={dur}
    label="PEMBUKAAN"
    title="Ancaman dari Langit"
    points={[
      "London, 1944: Perang Dunia II masih berlangsung",
      "Sebuah benda terbang muncul tanpa pilot di dalamnya",
      "Membawa bahan peledak dalam jumlah besar",
      "Namanya: V-1 Flying Bomb",
    ]}
  >
    <SkyVisual dur={dur} />
  </SceneShell>
);

/* ---------- Bagian 1: asal nama ---------- */
const Card: React.FC<{delay: number; hi?: boolean; children: React.ReactNode}> = ({
  delay,
  hi,
  children,
}) => {
  const a = useAppear(delay);
  return (
    <div
      style={{
        opacity: a,
        transform: `translateY(${(1 - a) * 40}px)`,
        background: hi ? `${C.accent}22` : "#ffffff0d",
        border: `2px solid ${hi ? C.accent : C.line}`,
        borderRadius: 20,
        padding: "26px 40px",
      }}
    >
      {children}
    </div>
  );
};

const Tag: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{color: C.dim, fontSize: 24, letterSpacing: 6, fontWeight: 700}}>{children}</div>
);

const NamesVisual: React.FC = () => {
  const a = useAppear(190);
  return (
    <div
      style={{
        fontFamily: FONT,
        height: 900,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Card delay={80}>
        <Tag>KODE AWAL</Tag>
        <div style={{color: C.ink, fontSize: 70, fontWeight: 800, marginTop: 8}}>Fieseler Fi 103</div>
      </Card>
      <div style={{color: C.accent, fontSize: 56, textAlign: "center", opacity: a}}>↓</div>
      <Card delay={260} hi>
        <Tag>NAMA RESMI</Tag>
        <div style={{color: C.ink, fontSize: 70, fontWeight: 800, marginTop: 8}}>V-1</div>
        <div style={{color: C.accent, fontSize: 40, marginTop: 6}}>Vergeltungswaffe 1</div>
      </Card>
      <Card delay={520}>
        <Tag>ARTINYA</Tag>
        <div style={{color: C.ink, fontSize: 60, fontWeight: 800, marginTop: 8}}>Senjata Pembalasan</div>
      </Card>
    </div>
  );
};

export const SceneBagian1: React.FC<{dur: number}> = ({dur}) => (
  <SceneShell
    dur={dur}
    label="BAGIAN 1"
    title="Munculnya Senjata Baru Jerman"
    points={[
      "1943–1944: posisi militer Jerman makin tertekan",
      "Butuh senjata jarak jauh tanpa mempertaruhkan pilot",
      "Kode awal: Fieseler Fi 103",
      "Terbang sendiri ke sasaran dengan kendali otomatis",
    ]}
  >
    <NamesVisual />
  </SceneShell>
);

/* ---------- Bagian 2: cara kerja ---------- */
const Callout: React.FC<{
  at: number;
  x: number;
  y1: number;
  y2: number;
  anchor: "start" | "middle" | "end";
  tx: number;
  title: string;
  sub: string;
}> = ({at, x, y1, y2, anchor, tx, title, sub}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 40], [0, 1], clamp);
  return (
    <g opacity={p}>
      <circle cx={x} cy={y1} r={9} fill={C.accent} />
      <line x1={x} y1={y1} x2={x} y2={y1 + (y2 - y1) * p} stroke={C.accent} strokeWidth={3} />
      <text x={tx} y={y2 + (y2 > y1 ? 34 : -50)} textAnchor={anchor} fill={C.ink} fontSize={34} fontWeight={700} fontFamily={FONT}>
        {title}
      </text>
      <text x={tx} y={y2 + (y2 > y1 ? 72 : -14)} textAnchor={anchor} fill={C.dim} fontSize={26} fontFamily={FONT}>
        {sub}
      </text>
    </g>
  );
};

const DiagramVisual: React.FC = () => {
  const f = useCurrentFrame();
  const k = 2.2;
  return (
    <svg viewBox="0 0 900 900" width={900} height={900}>
      <g transform={`translate(40 330) scale(${k})`}>
        <V1Shape propAngle={f * 40} />
      </g>
      <Callout at={150} x={392} y1={400} y2={250} anchor="middle" tx={392} title="Mesin pulsejet" sub="pembakaran berulang, suara berdenyut" />
      <Callout at={420} x={300} y1={510} y2={680} anchor="middle" tx={300} title="Giroskop" sub="autopilot & navigasi sederhana" />
      <Callout at={720} x={838} y1={506} y2={680} anchor="end" tx={880} title="Baling-baling hidung" sub="menghitung jarak tempuh" />
    </svg>
  );
};

export const SceneBagian2: React.FC<{dur: number}> = ({dur}) => (
  <SceneShell
    dur={dur}
    label="BAGIAN 2"
    title="Bagaimana V-1 Terbang Tanpa Pilot?"
    points={[
      "Mesin pulsejet: pembakaran berulang, suara berdenyut keras",
      "Julukan Inggris: Buzz Bomb atau Doodlebug",
      "Giroskop dan navigasi sederhana menjaga arah",
      "Baling-baling hidung menghitung jarak; batas putaran → menukik",
    ]}
  >
    <DiagramVisual />
  </SceneShell>
);

/* ---------- Bagian 3: angka-angka ---------- */
const Stat: React.FC<{
  delay: number;
  label: string;
  big?: string;
  num?: number;
  prefix?: string;
  suffix?: string;
  sub: string;
}> = ({delay, label, big, num, prefix = "", suffix = "", sub}) => {
  const f = useCurrentFrame();
  const v = num !== undefined ? Math.round(interpolate(f, [delay, delay + 70], [0, num], clamp)) : 0;
  return (
    <Card delay={delay} hi={num === undefined}>
      <Tag>{label}</Tag>
      <div style={{color: C.ink, fontSize: 92, fontWeight: 900, marginTop: 6}}>
        {num !== undefined ? `${prefix}${v}${suffix}` : big}
      </div>
      <div style={{color: C.dim, fontSize: 30}}>{sub}</div>
    </Card>
  );
};

const StatsVisual: React.FC = () => (
  <div style={{fontFamily: FONT, height: 900, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20}}>
    <Stat delay={80} label="PELUNCURAN PERTAMA" big="13 Juni 1944" sub="sekitar seminggu setelah Normandia" />
    <Stat delay={380} label="HULU LEDAK" num={850} prefix="±" suffix=" kg" sub="bahan peledak" />
    <Stat delay={680} label="KECEPATAN" num={640} prefix="±" suffix=" km/jam" sub="kecepatan yang dapat dicapai" />
  </div>
);

export const SceneBagian3: React.FC<{dur: number}> = ({dur}) => (
  <SceneShell
    dur={dur}
    label="BAGIAN 3"
    title="Serangan terhadap London"
    points={[
      "13 Juni 1944: V-1 mulai diluncurkan ke Inggris",
      "Dari landasan miring di Prancis yang diduduki Jerman",
      "Hulu ledak ±850 kg, kecepatan hingga ±640 km/jam",
      "Ribuan V-1 diluncurkan dalam beberapa bulan",
    ]}
  >
    <StatsVisual />
  </SceneShell>
);

/* ---------- Bagian 4: pertahanan berlapis ---------- */
const Ring: React.FC<{r: number; at: number; label: string; labelY: number}> = ({r, at, label, labelY}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 90], [0, 1], clamp);
  const circ = 2 * Math.PI * r;
  const lp = interpolate(f, [at + 40, at + 80], [0, 1], clamp);
  return (
    <g>
      <circle
        cx={450}
        cy={450}
        r={r}
        fill="none"
        stroke={C.accent}
        strokeWidth={5}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - p)}
        transform="rotate(-90 450 450)"
      />
      <text x={450} y={labelY} textAnchor="middle" fill={C.ink} fontSize={28} fontWeight={700} fontFamily={FONT} opacity={lp}>
        {label}
      </text>
    </g>
  );
};

const DefenseVisual: React.FC = () => {
  const f = useCurrentFrame();
  const n1 = interpolate(f, [950, 990], [0, 1], clamp);
  const n2 = interpolate(f, [1150, 1190], [0, 1], clamp);
  return (
    <svg viewBox="0 0 900 900" width={900} height={900}>
      <Ring r={330} at={100} label="1 · Pesawat tempur" labelY={105} />
      <Ring r={210} at={400} label="2 · Meriam antipesawat" labelY={225} />
      <Ring r={90} at={750} label="3 · Balon pembatas" labelY={345} />
      <circle cx={450} cy={450} r={14} fill={C.red} />
      <text x={450} y={490} textAnchor="middle" fill={C.ink} fontSize={24} fontWeight={700} letterSpacing={4} fontFamily={FONT}>
        LONDON
      </text>
      <text x={450} y={820} textAnchor="middle" fill={C.dim} fontSize={27} fontFamily={FONT} opacity={n1}>
        Radar + proximity fuze: meriam makin akurat
      </text>
      <text x={450} y={862} textAnchor="middle" fill={C.accent} fontSize={27} fontFamily={FONT} opacity={n2}>
        Akhir Agustus 1944: wilayah peluncuran direbut
      </text>
    </svg>
  );
};

export const SceneBagian4: React.FC<{dur: number}> = ({dur}) => (
  <SceneShell
    dur={dur}
    label="BAGIAN 4"
    title="Bagaimana Inggris Menghentikannya?"
    points={[
      "Pertahanan berlapis: pesawat tempur, meriam, balon pembatas",
      "Pilot menyentuh sayap V-1 dengan ujung sayap pesawat",
      "Radar dan proximity fuze meningkatkan keberhasilan",
      "Sekutu menyerang dan merebut fasilitas peluncuran",
    ]}
  >
    <DefenseVisual />
  </SceneShell>
);

/* ---------- Bagian 5: warisan ---------- */
const TimelineItem: React.FC<{i: number; delay: number; when: string; what: string; hi?: boolean}> = ({
  i,
  delay,
  when,
  what,
  hi,
}) => {
  const a = useAppear(delay);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 90 + i * 200,
        opacity: a,
        transform: `translateX(${(1 - a) * 40}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 14,
          width: 30,
          height: 30,
          borderRadius: 15,
          background: hi ? C.accent : C.ink,
          boxShadow: hi ? `0 0 30px ${C.accent}` : "none",
        }}
      />
      <div style={{marginLeft: 120, width: 740}}>
        <div style={{color: C.accent, fontSize: 30, letterSpacing: 4, fontWeight: 700}}>{when}</div>
        <div style={{color: C.ink, fontSize: hi ? 44 : 38, fontWeight: hi ? 800 : 500, lineHeight: 1.25, marginTop: 6}}>
          {what}
        </div>
      </div>
    </div>
  );
};

const LegacyVisual: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [60, 1000], [0, 1], clamp);
  return (
    <div style={{fontFamily: FONT, position: "relative", height: 900}}>
      <div style={{position: "absolute", left: 55, top: 100, width: 4, height: 640 * p, background: C.line}} />
      <TimelineItem i={0} delay={100} when="13 JUNI 1944" what="V-1 pertama diluncurkan ke Inggris" />
      <TimelineItem i={1} delay={330} when="AKHIR AGUSTUS 1944" what="Sekutu merebut wilayah peluncuran di Prancis" />
      <TimelineItem i={2} delay={560} when="MARET 1945" what="Kampanye serangan V-1 berakhir" />
      <TimelineItem i={3} delay={800} when="WARISAN" what="Rudal jelajah operasional pertama di dunia" hi />
    </div>
  );
};

export const SceneBagian5: React.FC<{dur: number}> = ({dur}) => (
  <SceneShell
    dur={dur}
    label="BAGIAN 5"
    title="Warisan V-1 Flying Bomb"
    points={[
      "Kampanye terhadap Inggris berakhir Maret 1945",
      "Rudal jelajah operasional pertama di dunia",
      "Prinsip dasar: terbang ke sasaran tanpa pilot",
      "Kini: navigasi satelit, sensor, dan komputer penerbangan",
    ]}
  >
    <LegacyVisual />
  </SceneShell>
);
