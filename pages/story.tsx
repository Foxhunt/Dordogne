/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from "next/router";

import { LayoutCamera, MotionCanvas } from "framer-motion-3d";
import { Text } from "@react-three/drei";

import Images from "@/components/images";

import { sounds } from "@/components/DotsGroup";

export default function Story() {
  const router = useRouter();

  return (
    <main className={`h-screen bg-black text-white`}>
      <MotionCanvas>
        <LayoutCamera
          position={[0, 0, 5]}
          animate={{ x: 0, y: 0, z: -12 }}
          transition={{ duration: 10 }}
          onAnimationStart={() => {
            router.prefetch("/dots");
            sounds.forEach((filename) => {
              fetch(`/assets/sound/${filename}.mp3`);
            });
          }}
          onAnimationComplete={() => router.push("/dots")}
        />
        <Images />
        <Text
          color="red"
          anchorX="center"
          anchorY="middle"
          scale={0.1}
          position={[0, 0, -1]}
        >
          Is this a Story yet?
        </Text>
      </MotionCanvas>
    </main>
  );
}
