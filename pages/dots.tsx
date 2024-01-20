import { useRef } from "react";

import { CameraControls, Select } from "@react-three/drei";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";
import { Mesh } from "three";

import CenterDot from "@/components/CenterDot";
import DotsGroup from "@/components/DotsGroup";
import Effects from "@/components/Effects";
import Lighting from "@/components/Lighting";

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
        <Lighting />
        <CenterDot ref={sunRef} />
        <Select
          filter={(selected) =>
            selected.filter((element) => element.userData.dot)
          }
        >
          <DotsGroup />
        </Select>
        <Effects sunRef={sunRef} />
      </MotionCanvas>
    </main>
  );
}
