import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { KyberComposition } from "./KyberComposition";
import { QuantumHookComposition } from "./QuantumHookComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="QuantumHook"
        component={QuantumHookComposition}
        durationInFrames={420}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="EllipticCurveCrypto"
        component={MyComposition}
        durationInFrames={360}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="KyberExplainer"
        component={KyberComposition}
        durationInFrames={420}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
