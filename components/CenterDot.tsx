import { forwardRef, useEffect, useState } from "react";

import { Billboard, MeshTransmissionMaterial, Text } from "@react-three/drei";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion-3d";

import { images, why } from "./OpeningWords";
import { Color } from "three";

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
      <MeshTransmissionMaterial
        transmission={4}
        samples={2}
        roughness={0.3}
        chromaticAberration={0.1}
        ior={1}
        thickness={2}
        clearcoat={1}
        clearcoatRoughness={1}
        color={new Color(0xffffff)}
        background={new Color(0x000000)}
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
