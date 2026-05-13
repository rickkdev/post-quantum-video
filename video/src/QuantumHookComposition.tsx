import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const clampProgress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeInOut = (frame: number, start: number, end: number) => {
  const fadeIn = interpolate(frame, [start, start + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - 10, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return Math.min(fadeIn, fadeOut);
};

const scrambleRows = [
  "TLS_HANDSHAKE  9F:A1:70:2C  LOCKED",
  "BANK_RECORD    C4:22:8B:01  LOCKED",
  "WALLET_KEY     03:FD:19:AA  LOCKED",
  "STATE_ARCHIVE  A8:45:EE:10  LOCKED",
  "MESSAGES       71:B0:14:D9  LOCKED",
];

const attackTargets = ["RSA", "Diffie-Hellman", "Elliptic Curves"];

export const QuantumHookComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = fadeInOut(frame, 0, 78);
  const oneWay = fadeInOut(frame, 66, 166);
  const shor = fadeInOut(frame, 144, 242);
  const harvest = fadeInOut(frame, 222, 334);
  const reality = fadeInOut(frame, 314, 420);
  const panicScale = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 180 },
  });
  const qDayPulse = 1 + Math.sin(frame * 0.42) * 0.025;
  const factorProgress = clampProgress(frame, 86, 135);
  const decryptProgress = clampProgress(frame, 252, 312);

  return (
    <AbsoluteFill className="quantum-hook">
      <div className="hook-grid" />
      <div className="hook-noise" />

      <div
        className="hook-warning"
        style={{
          opacity: open,
          transform: `translateY(${interpolate(open, [0, 1], [28, 0])}px) scale(${interpolate(
            panicScale,
            [0, 1],
            [0.82, 1],
          )})`,
        }}
      >
        <span>Public-key crypto</span>
        <h1>has an expiration date.</h1>
      </div>

      <div
        className="hook-terminal"
        style={{
          opacity: open,
          transform: `translateX(${interpolate(open, [0, 1], [34, 0])}px)`,
        }}
      >
        {scrambleRows.map((row, index) => (
          <div className="terminal-row" key={row}>
            <span>{row}</span>
            <b style={{ opacity: clampProgress(frame, 16 + index * 5, 34 + index * 5) }}>
              encrypted
            </b>
          </div>
        ))}
      </div>

      <div
        className="one-way-stage"
        style={{
          opacity: oneWay,
          transform: `translateY(${interpolate(oneWay, [0, 1], [20, 0])}px)`,
        }}
      >
        <div className="prime-card hot">p</div>
        <div className="operator">x</div>
        <div className="prime-card hot">q</div>
        <div className="operator">=</div>
        <div className="prime-card result">n</div>
        <div
          className="reverse-arrow"
          style={{
            opacity: factorProgress,
            transform: `scaleX(${interpolate(factorProgress, [0, 1], [0.25, 1])})`,
          }}
        />
        <div className="one-way-caption">
          Easy forward. Brutal backward.
        </div>
      </div>

      <div
        className="shor-panel"
        style={{
          opacity: shor,
          transform: `scale(${interpolate(shor, [0, 1], [0.94, 1])})`,
        }}
      >
        <div className="shor-name">Peter Shor, 1994</div>
        <h2>quantum shortcut found</h2>
        <div className="target-list">
          {attackTargets.map((target, index) => (
            <div
              className="target-chip"
              key={target}
              style={{
                opacity: clampProgress(frame, 170 + index * 10, 186 + index * 10),
                transform: `translateX(${interpolate(
                  clampProgress(frame, 170 + index * 10, 186 + index * 10),
                  [0, 1],
                  [-22, 0],
                )}px)`,
              }}
            >
              {target}
              <span>theoretically breakable</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="harvest-stage"
        style={{
          opacity: harvest,
          transform: `translateY(${interpolate(harvest, [0, 1], [22, 0])}px)`,
        }}
      >
        <div className="year now">2026</div>
        <div className="archive-stack">
          {scrambleRows.slice(0, 4).map((row, index) => (
            <div
              className="archive-card"
              key={`archive-${row}`}
              style={{
                transform: `translate(${index * 18}px, ${index * 14}px) rotate(${
                  -3 + index * 1.8
                }deg)`,
              }}
            >
              {row.slice(0, 12)}
            </div>
          ))}
        </div>
        <div
          className="decrypt-beam"
          style={{
            transform: `scaleX(${decryptProgress})`,
          }}
        />
        <div className="year later">2036?</div>
        <div className="qday" style={{ transform: `scale(${qDayPulse})` }}>
          Q-Day
        </div>
        <div className="harvest-caption">Harvest now. Decrypt later.</div>
      </div>

      <div
        className="reality-check"
        style={{
          opacity: reality,
          transform: `translateY(${interpolate(reality, [0, 1], [20, 0])}px)`,
        }}
      >
        <span>Not apocalypse tomorrow.</span>
        <h2>The attack cost is moving in the wrong direction.</h2>
        <p>So how serious is this, really?</p>
      </div>
    </AbsoluteFill>
  );
};
