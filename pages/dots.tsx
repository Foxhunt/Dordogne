import { LayoutCamera, MotionCanvas, motion } from "framer-motion-3d";

import { CameraControls, Select } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  GodRays,
} from "@react-three/postprocessing";

import DotsGroup from "@/components/DotsGroup";
import { useRef } from "react";
import { Mesh } from "three";

export default function Dots() {
  const sunRef = useRef<Mesh>(null!);

  return (
    <main className={`h-screen bg-black text-white`}>
      <MotionCanvas
        shadows
        gl={{
          alpha: true,
        }}
      >
        <LayoutCamera position={[0, 0, 100]} makeDefault />
        <CameraControls makeDefault maxDistance={100} minDistance={10} />
        <motion.ambientLight intensity={1} />
        <motion.pointLight position={[0, 0, 0]} intensity={100} castShadow />
        <motion.pointLight position={[0, 10, 0]} intensity={10} />
        <motion.pointLight position={[0, -10, 0]} intensity={10} />
        <motion.pointLight position={[0, 20, 0]} intensity={10} />
        <motion.pointLight position={[0, -20, 0]} intensity={10} />
        <motion.pointLight position={[0, 30, 0]} intensity={10} />
        <motion.pointLight position={[0, -30, 0]} intensity={10} />
        <motion.pointLight position={[0, 10, 0]} intensity={10} />
        <motion.pointLight position={[0, -10, 0]} intensity={10} />
        <motion.pointLight position={[10, 0, 0]} intensity={10} />
        <motion.pointLight position={[-10, 0, 0]} intensity={10} />
        <motion.pointLight position={[0, 0, 10]} intensity={10} />
        <motion.pointLight position={[0, 0, -10]} intensity={10} />
        <Select
          filter={(selected) =>
            selected.filter((element) => element.userData.dot)
          }
        >
          <DotsGroup />
        </Select>
        <motion.mesh
          //@ts-ignore
          ref={sunRef}
          key={"why?"}
          initial={{ scale: 0 }}
          animate={{ scale: 2, transition: { duration: 1 } }}
        >
          <motion.sphereGeometry />
          <motion.meshStandardMaterial
            transparent
            roughness={0.8}
            metalness={0.3}
            emissive={"#ffffff"}
            // @ts-ignore
            initial={{ emissiveIntensity: 0.1 }}
            animate={{
              // @ts-ignore
              emissiveIntensity: 0.5,
              transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 4,
              },
            }}
          />
        </motion.mesh>
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
      </MotionCanvas>
    </main>
  );
}
