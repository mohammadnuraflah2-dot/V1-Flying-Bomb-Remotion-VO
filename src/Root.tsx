import React from "react";
import {Composition} from "remotion";
import {Video, TOTAL} from "./Video";
import {FPS, H, W} from "./theme";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="V1FlyingBomb"
    component={Video}
    durationInFrames={TOTAL}
    fps={FPS}
    width={W}
    height={H}
  />
);
