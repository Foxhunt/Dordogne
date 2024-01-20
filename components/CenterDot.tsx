import { forwardRef, useEffect, useState } from "react";

import { Billboard, Text } from "@react-three/drei";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion-3d";

import { images, why } from "./OpeningWords";

const CenterDot = forwardRef(function CenterDot(props, ref) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex(Math.floor(Math.random() * images.length)),
      1000 * 20,
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.mesh
      //@ts-ignore
      ref={ref}
      key={"why?"}
      initial={{ scale: 0 }}
      animate={{ scale: 2, transition: { duration: 0.1 } }}
    >
      <motion.sphereGeometry />
      <motion.meshStandardMaterial
        transparent
        roughness={0.8}
        metalness={0.3}
        emissive={"#ffffff"}
        // @ts-ignore
        initial={{ emissiveIntensity: 0 }}
        animate={{
          // @ts-ignore
          emissiveIntensity: 1,
          transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 10,
          },
        }}
      />
      <Billboard>
        <AnimatePresence>
          <motion.group
            key={index}
            initial={{ x: 0, y: 0, z: 0, scale: 0 }}
            animate={{ x: 0, y: 2, z: 0, scale: 1 }}
            exit={{ x: 0, y: 0, z: 0, scale: 0 }}
          >
            <Text color="white" anchorX={"center"} font="Roboto-Regular.ttf">
              {why[index]} {images[index]}?
            </Text>
          </motion.group>
        </AnimatePresence>
      </Billboard>
    </motion.mesh>
  );
});

export default CenterDot;
