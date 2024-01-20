import {
  Bloom,
  DepthOfField,
  EffectComposer,
  GodRays,
} from "@react-three/postprocessing";

type EffectsProps = {
  sunRef: React.MutableRefObject<THREE.Mesh>;
};

export default function Effects({ sunRef }: EffectsProps) {
  return (
    <EffectComposer disableNormalPass>
      <Bloom mipmapBlur intensity={5} />
      <DepthOfField target={[0, 0, 0]} blur={10} bokehScale={1} />
      <GodRays
        sun={sunRef}
        // blendFunction={BlendFunction.Screen} // The blend function of this effect.
        samples={60} // The number of samples per pixel.
        density={0.96} // The density of the light rays.
        decay={0.9} // An illumination decay factor.
        weight={0.4} // A light ray weight factor.
        exposure={0.6} // A constant attenuation coefficient.
        clampMax={1} // An upper bound for the saturation of the overall effect.
        // width={Resizer.AUTO_SIZE} // Render width.
        // height={Resizer.AUTO_SIZE} // Render height.
        // kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
        blur={true} // Whether the god rays should be blurred to reduce artifacts.
      />
    </EffectComposer>
  );
}
