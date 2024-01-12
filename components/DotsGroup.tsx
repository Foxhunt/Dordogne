import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion-3d";

import {
  CameraControls,
  PositionalAudio,
  Text,
  Billboard,
  useSelect,
} from "@react-three/drei";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Vector3, PositionalAudio as PositionalAudioImpl } from "three";

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
    () => sounds.map((filename) => ({ src: filename, ...getPoint() })),
    []
  );

  const selected = useSelect();

  useEffect(() => {
    controls?.saveState();
  }, [controls]);

  useEffect(() => {
    if (selected[0]) {
      const audio = selected[0].children.filter(
        (child) => child.type === "Audio"
      )[0] as PositionalAudioImpl;

      audio?.play();

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
        {positions.map(({ src, ...position }, i) => (
          <motion.mesh
            castShadow
            receiveShadow
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
                duration: 5,
                delay: 0.8,
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
            />
            <PositionalAudio
              url={`/assets/sound/${src}.mp3`}
              distance={1}
              autoplay={false}
              loop={false}
            />
            {/* <motion.pointLight position={[0, 0, 0]} intensity={10} /> */}
            <Billboard>
              <Text
                depthOffset={0}
                color="white"
                anchorX={"center"}
                position={[0, 1.6, 0]}
              >
                {src}
              </Text>
            </Billboard>
          </motion.mesh>
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
