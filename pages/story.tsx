/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from "next/router";

import { Text } from "@react-three/drei";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";

import Images from "@/components/Images";
import {
  useMotionValueEvent,
  useScroll,
  useTime,
  useTransform,
  cubicBezier,
} from "framer-motion";

export default function Story() {
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const time = useTime();

  // const zPosition = useTransform(
  //   time,
  //   [0, 0.4 * 20000, 0.8 * 20000, 20000],
  //   [10, 0, -50, -60],
  //   {
  //     ease: cubicBezier(0.49, 0.04, 0.61, 0.84),
  //   },
  // );

  const scroll = useTransform(scrollYProgress, [0, 1], [0, 90 * 1000]);

  const zPosition = useTransform(scroll, [0, 90 * 1000], [20, -103], {
    ease: cubicBezier(0.6, 0.39, 0.66, 0.8),
  });

  useMotionValueEvent(zPosition, "change", (latestValue) => {
    if (latestValue <= -103) {
      router.push("/dots");
    }
  });

  return (
    <main className={`h-[500vh] bg-black text-white`}>
      <div className={`fixed h-screen w-screen`}>
        <MotionCanvas>
          <LayoutCamera
            // @ts-ignore
            position={[0, 0, zPosition]}
            // animate={{ x: 0, y: 0, z: -60 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            onAnimationStart={() => {
              router.prefetch("/dots");
            }}
            onAnimationComplete={() => router.push("/dots")}
          />
          <Images />
          <Text
            outlineColor="black"
            outlineWidth={0.07}
            outlineOpacity={1}
            anchorX="center"
            anchorY="middle"
            textAlign="justify"
            scale={0.1}
            position={[0, -0.1, 15]}
            maxWidth={20}
          >
            Warum sich Menschen Bilder machen?
          </Text>
          <Text
            outlineColor="black"
            outlineWidth={0.07}
            outlineOpacity={1}
            anchorX="center"
            anchorY="middle"
            textAlign="center"
            scale={0.1}
            position={[0, 0.1, 10]}
            maxWidth={15}
          >
            Diese Frage stellten sich 26 Studierende der Hochschule Düsseldorf.
          </Text>
        </MotionCanvas>
      </div>
    </main>
  );
}
