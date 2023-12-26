import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { LayoutCamera, MotionCanvas, motion } from "framer-motion-3d";

import { extend } from "@react-three/fiber";
import * as three from "three";
extend(three);

export default function Dots() {
  const [clicked, setClicked] = useState(true);

  return (
    <main
      className={`h-screen bg-black text-white`}
      onClick={() => setClicked((clicked) => !clicked)}
    >
      <MotionCanvas
        gl={{
          antialias: true,
        }}
      >
        <LayoutCamera position={[0, 0, 100]} />
        <motion.ambientLight color={"white"} intensity={1000} />
        <motion.group
          animate={{
            rotateY: Math.PI * 2,
            transition: {
              duration: 60 * 4,
              ease: "linear",
              repeat: Infinity,
            },
          }}
        >
          <AnimatePresence>
            {clicked && (
              <motion.mesh
                key={"why?"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 3 }}
              >
                <motion.sphereGeometry />
                <motion.meshStandardMaterial color="white" />
              </motion.mesh>
            )}
            {Array.from({ length: 100 }).map(
              (_, i) =>
                clicked && (
                  <motion.mesh
                    key={"why me?" + i}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 0.2 + 0.2 * Math.random(),
                      ...getPoint(),
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{
                      scale: 0,
                      x: 0,
                      y: 0,
                      z: 0,
                      transition: { duration: 0.1 },
                    }}
                    whileHover={{ scale: 3 }}
                  >
                    <motion.sphereGeometry />
                    <AnimatePresence initial>
                      {clicked && (
                        <motion.meshStandardMaterial
                          key={i + "why me?" + i}
                          initial={{ opacity: 0.2 + 0.3 * Math.random() }}
                          animate={{
                            opacity: 1,
                            transition: {
                              duration: 0.7 + 0.3 * Math.random(),
                              repeat: Infinity,
                              repeatType: "reverse",
                            },
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.mesh>
                )
            )}
          </AnimatePresence>
        </motion.group>
      </MotionCanvas>
    </main>
  );
}

const maxDistance = 400;

function getPoint() {
  var d, x, y, z;
  do {
    x = Math.random() * maxDistance - maxDistance / 2;
    y = Math.random() * maxDistance - maxDistance / 2;
    z = Math.random() * maxDistance - maxDistance / 2;
    d = x * x + y * y + z * z;
  } while (d > maxDistance);
  return { x, y, z };
}
