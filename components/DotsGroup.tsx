import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion-3d";

import { CameraControls, useSelect } from "@react-three/drei";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import Dot from "./dot";

export const sounds = [
  "Arthur",
  "Carlo",
  "Chris 2",
  "Gina",
  "Jordan",
  "Linh 1",
  "Marco",
  "Marvin",
  "Max 2",
  "Naima",
  "Seda",
  "Sophie H.",
  "Tien",
  "Vicky",
  "Ben",
  "Chris 1",
  "Gamze",
  "Jo-Ann",
  "Leeloo",
  "Linh 2",
  "Marie",
  "Max 1",
  "Michael",
  "Piet",
  "Sofiy",
  "Sophie R.",
  "Timo",
  "Vivien",
];

export default function DotsGroup() {
  const controls = useThree(
    (state) => state.controls as unknown as CameraControls,
  );

  const [rotate, setRotate] = useState(true);

  const groupRef = useRef<GroupProps>(null);

  useFrame(() => {
    if (rotate) {
      groupRef.current?.rotateY?.(0.001);
    }
  });

  const positions = useMemo(
    () => sounds.map((filename) => ({ filename, ...getPoint() })),
    [],
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
        position.z + 50,
        position.x,
        position.y,
        position.z,
        true,
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
        {positions.map(({ filename, ...position }, i) => (
          <Dot key={"why me?" + i} filename={filename} position={position} />
        ))}
      </AnimatePresence>
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
