/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  cubicBezier,
  motion,
} from "framer-motion";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";

import Content from "@/components/Content";

export default function Story() {
  const router = useRouter();

  const { scrollYProgress } = useScroll();

  const zPosition = useTransform(scrollYProgress, [0, 1], [24, -103], {
    ease: cubicBezier(0.6, 0.39, 0.66, 0.8),
  });

  const opacity = useTransform(zPosition, [24, 23], [1, 0], {
    ease: cubicBezier(0.6, 0.39, 0.66, 0.8),
  });

  useMotionValueEvent(zPosition, "change", (latestValue) => {
    console.log("zPosition:", latestValue);

    if (latestValue <= -100) {
      router.push("/dots");
    }
  });

  useEffect(() => {
    router.prefetch("/dots");
  }, [router]);

  return (
    <main className={`h-[500vh] bg-black text-white`}>
      <div className={`fixed h-screen w-screen`}>
        <MotionCanvas>
          <LayoutCamera
            // @ts-ignore
            position={[0, 0, zPosition]}
          />
          <Content zPosition={zPosition} />
        </MotionCanvas>
      </div>
      <motion.div
        style={{ opacity }}
        className={`fixed bottom-0 left-0 right-0 text-center pb-10`}
      >
        scroll all the way down
      </motion.div>
    </main>
  );
}
