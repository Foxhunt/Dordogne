import { Billboard, PositionalAudio, Text, useSelect } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import { Object3D, PositionalAudio as PositionalAudioImpl } from "three";

type DotProps = {
  filename: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export default function Dot({ filename, position }: DotProps) {
  const meshRef = useRef<Object3D>(null!);
  const audioRef = useRef<PositionalAudioImpl>(null!);

  const selected = useSelect();
  useEffect(() => {
    const audio = audioRef.current;
    if (selected[0] === meshRef.current) {
      audio?.play();
    } else if (audio.isPlaying) {
      audio?.stop();
    }
  }, [selected]);

  return (
    <motion.mesh
      //@ts-ignore
      ref={meshRef}
      castShadow
      receiveShadow
      userData={{ dot: true }}
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
        ref={audioRef}
        url={`/assets/sound/${filename}.mp3`}
        distance={1}
        autoplay={false}
        loop={false}
      />
      <Billboard>
        <Text
          depthOffset={0}
          color="white"
          anchorX={"center"}
          position={[0, 1.6, 0]}
        >
          {filename}
        </Text>
      </Billboard>
    </motion.mesh>
  );
}
