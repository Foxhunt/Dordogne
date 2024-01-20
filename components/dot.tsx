import { Billboard, Text, useSelect } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, Object3D } from "three";

type DotProps = {
  filename: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

interface Word {
  startOffset: string;
  endOffset: string;
  word: string;
  confidence: number;
}

interface TransformedWord {
  startOffset: number;
  endOffset: number;
  word: string;
}

interface Alternative {
  transcript: string;
  confidence: number;
  words: Word[];
}

interface Transcript {
  alternatives: Alternative[];
  resultEndOffset: string;
  languageCode: string;
}

export default function Dot({ filename, position }: DotProps) {
  const meshRef = useRef<Object3D>(null!);
  const audioRef = useRef<HTMLAudioElement>(null!);
  const wordsRef = useRef<TransformedWord[]>([]);

  const [word, setWord] = useState("");

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(`/assets/sound/${filename}.mp3`);
      audio.loop = false;
      audio.autoplay = false;
      audio.preload = "auto";

      audioRef.current = audio;

      fetch(`/assets/transcripts/${filename}.json`)
        .then((response) => response.json())
        .then((data: { results: Transcript[] }) => {
          const words = data.results
            .flatMap((result) => result.alternatives[0].words)
            .map(({ word, startOffset, endOffset }) => ({
              word,
              startOffset: Number(startOffset.slice(0, -1)),
              endOffset: Number(endOffset.slice(0, -1)),
            }));
          wordsRef.current = words;
        });
    }
  }, [filename]);

  const selected = useSelect();
  const [isSelected, setIsSelected] = useState(selected[0] === meshRef.current);
  useEffect(() => {
    setIsSelected(selected[0] === meshRef.current);
  }, [selected]);

  const [visited, setVisited] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;
    console.log(isSelected);
    if (isSelected) {
      audio.load();
      audio.play();
      setVisited(true);
    } else if (!audio.paused) {
      audio.pause();
    }
  }, [filename, isSelected]);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (isSelected) {
      const currentTime = (timeRef.current += delta) - 0.3;
      const currentWord = wordsRef.current.find(
        ({ startOffset, endOffset }) =>
          currentTime >= startOffset && currentTime <= endOffset,
      );
      if (currentWord) {
        setWord(currentWord.word);
      }
    } else {
      timeRef.current = 0;
    }
  });

  return (
    <motion.mesh
      //@ts-ignore
      ref={meshRef}
      userData={{ dot: true }}
      position={[position.x, position.y, position.z]}
      animate={{
        // ...position,
        transition: {
          type: "spring",
          duration: 5,
          delay: 0.8,
        },
      }}
    >
      <motion.sphereGeometry />
      <motion.meshStandardMaterial
        color={"#fff"}
        roughness={0.2}
        metalness={0.1}
        transparent
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 5,
          },
        }}
      />
      <Billboard>
        <AnimatePresence>
          {isSelected && (
            <motion.group
              key={word}
              initial={{ x: 0, y: 0, z: 0, scale: 0 }}
              animate={{ x: 1.5, y: 0.5, z: 3, scale: 1 }}
              exit={{ x: 2, y: 2, z: -3, scale: 0 }}
            >
              <Text color="white" anchorX={"left"}>
                {word}
              </Text>
            </motion.group>
          )}
          {(isSelected || visited) && (
            <motion.group
              key={filename}
              initial={{ x: 0, y: 0, z: 0, scale: 0 }}
              animate={{ x: 0, y: 1.6, z: 0, scale: 1 }}
              exit={{ x: 0, y: 0, z: 0, scale: 0 }}
            >
              <Text color="white" anchorX={"center"}>
                {filename}
              </Text>
            </motion.group>
          )}
          {!visited &&
            new Array(5).fill("").map((_, index) => (
              <motion.mesh
                key={"ring" + index}
                rotation={[Math.PI, 0, 0]}
                variants={{
                  initial: { scale: 2 },
                  animate: {
                    scale: 0,
                    transition: {
                      duration: 3,
                      repeatDelay: 1,
                      delay: 2 + index * 0.2,
                      repeat: Infinity,
                      repeatType: "loop",
                    },
                  },
                  exit: { scale: 0, transition: { duration: 1 } },
                }}
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
              >
                <ringGeometry args={[1, 1.1]} />
                <motion.meshStandardMaterial
                  color={"#fff"}
                  roughness={0.2}
                  metalness={0.1}
                  side={DoubleSide}
                  transparent
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: {
                        duration: 3,
                        repeatDelay: 1,
                        delay: 2 + index * 0.2,
                        repeat: Infinity,
                        repeatType: "loop",
                      },
                    },
                    exit: { opacity: 0, transition: { duration: 1 } },
                  }}
                />
              </motion.mesh>
            ))}
        </AnimatePresence>
      </Billboard>
    </motion.mesh>
  );
}
