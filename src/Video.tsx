import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {Background} from "./components";
import {
  SceneTitle,
  SceneOpening,
  SceneBagian1,
  SceneBagian2,
  SceneBagian3,
  SceneBagian4,
  SceneBagian5,
} from "./scenes";

// Durasi tiap adegan dalam frame (30 FPS). Ubah angka di sini untuk memperpanjang/memperpendek.
const SCENES: {dur: number; Comp: React.FC<{dur: number}>; audio: string}[] = [
  {dur: 210, Comp: SceneTitle, audio: "TITLE.wav"},
  {dur: 900, Comp: SceneOpening, audio: "OPEN.wav"},
  {dur: 1200, Comp: SceneBagian1, audio: "P1.wav"},
  {dur: 1500, Comp: SceneBagian2, audio: "P2.wav"},
  {dur: 1200, Comp: SceneBagian3, audio: "P3.wav"},
  {dur: 1500, Comp: SceneBagian4, audio: "P4.wav"},
  {dur: 1200, Comp: SceneBagian5, audio: "P5.wav"},
];

export const TOTAL = SCENES.reduce((s, x) => s + x.dur, 0);

export const Video: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill>
      <Background />
      {SCENES.map(({dur, Comp, audio}, i) => {
        const start = from;
        from += dur;
        return (
          <Sequence key={i} from={start} durationInFrames={dur}>
            <Comp dur={dur} />
            <Audio src={staticFile(`vo/${audio}`)} volume={0.9} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
