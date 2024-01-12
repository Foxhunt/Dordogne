import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion-3d";

import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { CameraControls, useSelect, Html } from "@react-three/drei";

export default function DotsGroup() {
  const controls = useThree(
    (state) => state.controls as unknown as CameraControls
  );

  const [rotate, setRotate] = useState(true);

  const groupRef = useRef<GroupProps>(null);

  useFrame(() => {
    if (rotate) {
      groupRef.current?.rotateY?.(0.001);
    }
  });

  const positions = useMemo(
    () => Array.from({ length: 30 }).map(() => ({ ...getPoint() })),
    []
  );

  const selected = useSelect();

  useEffect(() => {
    controls?.saveState();
  }, [controls]);

  useEffect(() => {
    if (selected[0]) {
      const position = new Vector3();
      selected[0].getWorldPosition(position);
      controls?.setLookAt(
        position.x,
        position.y,
        position.z + 30,
        position.x,
        position.y,
        position.z,
        true
      );
      setRotate(false);
    } else {
      controls?.reset(true);
      setRotate(true);
    }
  }, [controls, selected]);

  return (
    <motion.group ref={groupRef} castShadow receiveShadow>
      <AnimatePresence>
        {positions.map((position, i) => (
          <motion.mesh
            userData={{ dot: true }}
            key={"why me?" + i}
            initial={{
              scale: 1,
            }}
            animate={{
              scale: 1 + 0.2 * Math.random(),
              ...position,
              transition: {
                type: "spring",
                duration: 3,
                scale: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.7 + 0.3 * Math.random(),
                },
              },
            }}
          >
            <motion.sphereGeometry />
            <motion.meshStandardMaterial
              color={"#fff"}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.99}
            />
          </motion.mesh>
        ))}
      </AnimatePresence>
      {/* <Html
        as="div" // Wrapping element (default: 'div')
        transform // If true, applies matrix3d transformations (default=false)
        position={[100, 0, 0]} // The x/y/z of the object relative to the center of the scene (default=[0,0,0])
      >
        <h1 className="text-white">hello</h1>
        <p>world</p>
      </Html> */}
    </motion.group>
  );
}

const minDistance = 100;
const maxDistance = 370;

function getPoint() {
  var d, x, y, z;
  do {
    x = Math.random() * maxDistance - maxDistance / 2;
    y = Math.random() * maxDistance - maxDistance / 2;
    z = Math.random() * maxDistance - maxDistance / 2;
    d = x * x + y * y + z * z;
  } while (minDistance > d || d > maxDistance);
  return { x, y, z };
}
