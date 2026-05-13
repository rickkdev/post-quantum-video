import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Cell = {
  value: string;
  tone: "matrix" | "secret" | "noise" | "cipher";
};

const publicMatrix: Cell[] = [
  { value: "A", tone: "matrix" },
  { value: "17", tone: "matrix" },
  { value: "91", tone: "matrix" },
  { value: "44", tone: "matrix" },
  { value: "03", tone: "matrix" },
  { value: "pk", tone: "matrix" },
  { value: "68", tone: "matrix" },
  { value: "25", tone: "matrix" },
  { value: "b", tone: "matrix" },
];

const secretCells: Cell[] = [
  { value: "-1", tone: "secret" },
  { value: "0", tone: "secret" },
  { value: "1", tone: "secret" },
  { value: "s", tone: "secret" },
  { value: "0", tone: "secret" },
  { value: "-1", tone: "secret" },
  { value: "1", tone: "secret" },
  { value: "0", tone: "secret" },
  { value: "e", tone: "noise" },
];

const cipherCells: Cell[] = [
  { value: "u", tone: "cipher" },
  { value: "73", tone: "cipher" },
  { value: "12", tone: "cipher" },
  { value: "v", tone: "cipher" },
  { value: "+", tone: "noise" },
  { value: "noise", tone: "noise" },
  { value: "91", tone: "cipher" },
  { value: "04", tone: "cipher" },
  { value: "key?", tone: "cipher" },
];

const noisePoints = Array.from({ length: 34 }, (_, index) => ({
  x: 62 + ((index * 83) % 520),
  y: 52 + ((index * 47) % 300),
  r: 2 + (index % 4),
  delay: index * 2.2,
}));

const clampProgress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeInOut = (frame: number, start: number, end: number) => {
  const fadeIn = interpolate(frame, [start, start + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - 16, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return Math.min(fadeIn, fadeOut);
};

const MatrixGrid: React.FC<{
  cells: Cell[];
  progress: number;
  className?: string;
}> = ({ cells, progress, className = "" }) => (
  <div className={`kyber-matrix ${className}`}>
    {cells.map((cell, index) => {
      const cellProgress = clampProgress(progress * 100, index * 5, index * 5 + 35);

      return (
        <div
          className={`kyber-cell ${cell.tone}`}
          key={`${cell.value}-${index}`}
          style={{
            opacity: cellProgress,
            transform: `translateY(${interpolate(cellProgress, [0, 1], [16, 0])}px) scale(${interpolate(
              cellProgress,
              [0, 1],
              [0.92, 1],
            )})`,
          }}
        >
          {cell.value}
        </div>
      );
    })}
  </div>
);

const FlowLabel: React.FC<{
  label: string;
  detail: string;
  progress: number;
}> = ({ label, detail, progress }) => (
  <div
    className="kyber-flow-label"
    style={{
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
    }}
  >
    <span>{label}</span>
    <p>{detail}</p>
  </div>
);

const SecretBadge: React.FC<{
  label: string;
  progress: number;
  variant?: "alice" | "bob";
}> = ({ label, progress, variant = "alice" }) => (
  <div
    className={`secret-badge ${variant}`}
    style={{
      opacity: progress,
      transform: `scale(${interpolate(progress, [0, 1], [0.85, 1])})`,
    }}
  >
    {label}
  </div>
);

export const KyberComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = fadeInOut(frame, 0, 90);
  const latticeScene = clampProgress(frame, 92, 130);
  const encapsulateScene = clampProgress(frame, 165, 205);
  const decapsulateScene = clampProgress(frame, 275, 315);
  const matrixIn = clampProgress(frame, 98, 150);
  const secretIn = clampProgress(frame, 130, 188);
  const cipherIn = clampProgress(frame, 210, 276);
  const packetTravel = clampProgress(frame, 232, 308);
  const recover = clampProgress(frame, 314, 380);
  const packetFadeOut = interpolate(frame, [314, 345], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalPop = spring({
    frame: frame - 356,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const packetX = interpolate(packetTravel, [0, 1], [28, 430]);
  const packetY = interpolate(packetTravel, [0, 1], [334, 334]);

  return (
    <AbsoluteFill className="kyber-video">
      <div className="kyber-grid" />

      <div
        className="kyber-title"
        style={{
          opacity: intro,
          transform: `translateY(${interpolate(intro, [0, 1], [26, 0])}px)`,
        }}
      >
        <div className="kyber-eyebrow">Kyber key exchange</div>
        <h1>Hide the key inside noisy lattice math.</h1>
        <p>
          Instead of factoring giant numbers, Kyber publishes equations with
          carefully added noise. The private key can clean it up. Everyone else
          sees a hard lattice problem.
        </p>
      </div>

      <div className="kyber-stage">
        <div className="kyber-left">
          <div
            className="lattice-board"
            style={{
              opacity: latticeScene,
              transform: `translateX(${interpolate(latticeScene, [0, 1], [-26, 0])}px)`,
            }}
          >
            <svg viewBox="0 0 640 390">
              {Array.from({ length: 11 }, (_, index) => (
                <line
                  className="lattice-line"
                  key={`v-${index}`}
                  x1={70 + index * 50}
                  x2={70 + index * 50}
                  y1="35"
                  y2="355"
                />
              ))}
              {Array.from({ length: 7 }, (_, index) => (
                <line
                  className="lattice-line"
                  key={`h-${index}`}
                  x1="55"
                  x2="590"
                  y1={55 + index * 48}
                  y2={55 + index * 48}
                />
              ))}
              <path
                className="lattice-vector public"
                d="M 92 310 C 198 244, 248 198, 356 132 S 500 86, 560 66"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - matrixIn}
              />
              <path
                className="lattice-vector private"
                d="M 102 312 C 206 266, 274 232, 358 188 S 466 152, 548 118"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - secretIn}
              />
              {noisePoints.map((point, index) => {
                const opacity = clampProgress(frame, 128 + point.delay, 178 + point.delay);
                return (
                  <circle
                    className="noise-dot"
                    cx={point.x}
                    cy={point.y}
                    key={index}
                    r={point.r}
                    style={{ opacity }}
                  />
                );
              })}
              <text className="lattice-caption" x="75" y="36">
                public lattice equations
              </text>
              <text className="lattice-caption private" x="344" y="238">
                small secret + small noise
              </text>
            </svg>
          </div>

          <div className="kyber-flow">
            <FlowLabel
              detail="Key generation publishes A and b. The short private vector stays hidden."
              label="1. Keygen"
              progress={latticeScene}
            />
            <FlowLabel
              detail="Encapsulation adds fresh randomness and creates ciphertext plus a shared secret."
              label="2. Encapsulate"
              progress={encapsulateScene}
            />
            <FlowLabel
              detail="Decapsulation uses the private key to remove enough noise to recover the same secret."
              label="3. Decapsulate"
              progress={decapsulateScene}
            />
          </div>
        </div>

        <div className="kyber-right">
          <div className="party-row">
            <div className="party alice">
              <span>Alice</span>
              <small>sender</small>
            </div>
            <div className="party bob">
              <span>Bob</span>
              <small>private key holder</small>
            </div>
          </div>

          <div className="matrix-stack">
            <div
              className="matrix-card public-key"
              style={{
                opacity: latticeScene,
                transform: `translateY(${interpolate(latticeScene, [0, 1], [24, 0])}px)`,
              }}
            >
              <span className="matrix-label">Public key</span>
              <MatrixGrid cells={publicMatrix} progress={matrixIn} />
            </div>

            <div
              className="matrix-card private-key"
              style={{
                opacity: latticeScene,
                transform: `translateY(${interpolate(latticeScene, [0, 1], [24, 0])}px)`,
              }}
            >
              <span className="matrix-label">Private key</span>
              <MatrixGrid cells={secretCells} progress={secretIn} />
            </div>
          </div>

          <div
            className="cipher-card"
            style={{
              opacity: encapsulateScene,
              transform: `translateY(${interpolate(encapsulateScene, [0, 1], [20, 0])}px)`,
            }}
          >
            <span className="matrix-label">Ciphertext sent over the network</span>
            <MatrixGrid cells={cipherCells} className="cipher-grid" progress={cipherIn} />
          </div>

          <div
            className="packet"
            style={{
              opacity: encapsulateScene * packetFadeOut,
              transform: `translate(${packetX}px, ${packetY}px) rotate(${interpolate(packetTravel, [0, 1], [-8, 7])}deg)`,
            }}
          >
            u, v
          </div>

          <SecretBadge label="shared secret K" progress={cipherIn} />
          <SecretBadge label="same K" progress={recover} variant="bob" />
        </div>
      </div>

      <div
        className="kyber-takeaway"
        style={{
          opacity: recover,
          transform: `scale(${interpolate(finalPop, [0, 1], [0.92, 1])})`,
        }}
      >
        Quantum-safe idea: no known efficient quantum shortcut for the noisy
        lattice problem Kyber relies on.
      </div>
    </AbsoluteFill>
  );
};
