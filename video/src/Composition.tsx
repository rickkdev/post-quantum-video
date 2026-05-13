import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Point = {
  x: number;
  y: number;
};

const curvePoints = Array.from({ length: 161 }, (_, index) => {
  const x = -4 + index * 0.05;
  return { x, y: 0.13 * x * x * x - 1.05 * x };
});

const toSvgPoint = ({ x, y }: Point) => ({
  x: 320 + x * 62,
  y: 270 - y * 62,
});

const curvePath = curvePoints
  .map((point, index) => {
    const svgPoint = toSvgPoint(point);
    return `${index === 0 ? "M" : "L"} ${svgPoint.x.toFixed(2)} ${svgPoint.y.toFixed(2)}`;
  })
  .join(" ");

const publicKeyPoints = [
  { x: -2.4, y: 1.04 },
  { x: -1.3, y: 1.12 },
  { x: 0.1, y: -0.1 },
  { x: 1.55, y: -0.8 },
  { x: 2.55, y: 0.08 },
  { x: 3.15, y: 1.12 },
];

const aliceSecretPath = [
  { x: 0.1, y: -0.1 },
  { x: 0.95, y: -0.78 },
  { x: 1.9, y: -0.46 },
  { x: 2.75, y: 0.42 },
  { x: 3.15, y: 1.12 },
];

const bobSecretPath = [
  { x: 2.55, y: 0.08 },
  { x: 1.8, y: -0.56 },
  { x: 1.05, y: -0.82 },
  { x: 2.25, y: -0.2 },
  { x: 3.15, y: 1.12 },
];

const clampProgress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeInOut = (frame: number, start: number, end: number) => {
  const fadeIn = interpolate(frame, [start, start + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - 18, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
};

const followPath = (points: Point[], progress: number) => {
  const scaled = progress * (points.length - 1);
  const index = Math.min(Math.floor(scaled), points.length - 2);
  const local = scaled - index;
  const from = points[index];
  const to = points[index + 1];

  return {
    x: from.x + (to.x - from.x) * local,
    y: from.y + (to.y - from.y) * local,
  };
};

const Dot: React.FC<{
  point: Point;
  label: string;
  color: string;
  opacity?: number;
  large?: boolean;
}> = ({ point, label, color, opacity = 1, large = false }) => {
  const svgPoint = toSvgPoint(point);

  return (
    <g style={{ opacity }}>
      <circle
        cx={svgPoint.x}
        cy={svgPoint.y}
        fill={color}
        r={large ? 14 : 10}
        stroke="#f8fafc"
        strokeWidth="4"
      />
      <text
        className="svg-label"
        fill={color}
        x={svgPoint.x + 18}
        y={svgPoint.y - 16}
      >
        {label}
      </text>
    </g>
  );
};

const PathTrace: React.FC<{
  points: Point[];
  color: string;
  progress: number;
  opacity: number;
}> = ({ points, color, progress, opacity }) => {
  const d = points
    .map((point, index) => {
      const svgPoint = toSvgPoint(point);
      return `${index === 0 ? "M" : "L"} ${svgPoint.x.toFixed(2)} ${svgPoint.y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <path
      d={d}
      fill="none"
      opacity={opacity}
      pathLength={1}
      stroke={color}
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="6"
    />
  );
};

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = fadeInOut(frame, 0, 95);
  const keyScene = fadeInOut(frame, 70, 205);
  const sharedScene = fadeInOut(frame, 185, 330);
  const ending = clampProgress(frame, 305, 350);
  const curveDraw = clampProgress(frame, 22, 78);
  const publicProgress = clampProgress(frame, 120, 178);
  const aliceProgress = clampProgress(frame, 220, 285);
  const bobProgress = clampProgress(frame, 232, 297);
  const pop = spring({
    frame: frame - 300,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const movingPublicPoint = followPath(publicKeyPoints, publicProgress);
  const alicePoint = followPath(aliceSecretPath, aliceProgress);
  const bobPoint = followPath(bobSecretPath, bobProgress);

  return (
    <AbsoluteFill className="ecc-video">
      <div className="background-grid" />

      <div
        className="title-block"
        style={{
          opacity: intro,
          transform: `translateY(${interpolate(intro, [0, 1], [24, 0])}px)`,
        }}
      >
        <div className="eyebrow">Elliptic Curve Cryptography</div>
        <h1>Easy math forward. Painful math backward.</h1>
        <p>
          ECC hides a private number inside repeated movement on a curve. The
          public point is visible. The shortcut back is not.
        </p>
      </div>

      <div className="stage">
        <svg
          className="curve-board"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 640 520"
        >
          <line className="axis" x1="70" x2="570" y1="270" y2="270" />
          <line className="axis" x1="320" x2="320" y1="60" y2="470" />
          <path
            className="curve"
            d={curvePath}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - curveDraw}
          />
          <Dot
            color="#f97316"
            label="G"
            opacity={clampProgress(frame, 55, 85)}
            point={publicKeyPoints[0]}
          />
          <PathTrace
            color="#22c55e"
            opacity={keyScene}
            points={publicKeyPoints}
            progress={publicProgress}
          />
          <Dot
            color="#22c55e"
            label="private k x G = public P"
            opacity={keyScene}
            point={movingPublicPoint}
            large
          />
          <PathTrace
            color="#38bdf8"
            opacity={sharedScene}
            points={aliceSecretPath}
            progress={aliceProgress}
          />
          <PathTrace
            color="#a78bfa"
            opacity={sharedScene}
            points={bobSecretPath}
            progress={bobProgress}
          />
          <Dot
            color="#38bdf8"
            label="Alice"
            opacity={sharedScene}
            point={alicePoint}
          />
          <Dot
            color="#a78bfa"
            label="Bob"
            opacity={sharedScene}
            point={bobPoint}
          />
          <Dot
            color="#facc15"
            label="same shared point"
            opacity={ending}
            point={aliceSecretPath[aliceSecretPath.length - 1]}
            large
          />
        </svg>

        <div className="explainer-panel">
          <div
            className="panel-card"
            style={{
              opacity: keyScene,
              transform: `translateX(${interpolate(keyScene, [0, 1], [34, 0])}px)`,
            }}
          >
            <span className="tag">Public key</span>
            <h2>Pick a private number</h2>
            <p>
              Start from generator point <b>G</b>. Hop on the curve <b>k</b>{" "}
              times. The landing point <b>P</b> becomes public.
            </p>
            <div className="formula">
              <span>k</span>
              <span>x</span>
              <span>G</span>
              <span>=</span>
              <span>P</span>
            </div>
          </div>

          <div
            className="panel-card"
            style={{
              opacity: sharedScene,
              transform: `translateX(${interpolate(sharedScene, [0, 1], [34, 0])}px)`,
            }}
          >
            <span className="tag alt">Shared secret</span>
            <h2>Different paths, same point</h2>
            <p>
              Alice uses her secret with Bob&apos;s public point. Bob uses his
              secret with Alice&apos;s public point. Both arrive at the same
              coordinate.
            </p>
            <div className="formula compact">
              <span>a x B</span>
              <span>=</span>
              <span>b x A</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="takeaway"
        style={{
          opacity: ending,
          transform: `scale(${interpolate(pop, [0, 1], [0.92, 1])})`,
        }}
      >
        The public data is safe because reversing the hops is the hard problem.
      </div>
    </AbsoluteFill>
  );
};
