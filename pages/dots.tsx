import { LayoutCamera, MotionCanvas, motion } from "framer-motion-3d";

import { CameraControls, Select } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ColorAverage,
} from "@react-three/postprocessing";

import DotsGroup from "@/components/DotsGroup";

export default function Dots() {
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
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur intensity={5} />
          <DepthOfField target={[0, 0, 10]} bokehScale={1} />
          <ColorAverage />
        </EffectComposer>
      </MotionCanvas>
    </main>
  );
}
