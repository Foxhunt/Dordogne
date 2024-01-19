import { Billboard, Text, useSelect } from "@react-three/drei";
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

// The whole file can be represented as an array of Transcripts
type TranscriptFile = Transcript[];

export default function Dot({ filename, position }: DotProps) {
  const meshRef = useRef<Object3D>(null!);
  const audioRef = useRef<HTMLAudioElement>(null!);
  const wordsRef = useRef<TransformedWord[]>(null!);

  const [word, setWord] = useState("");

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(`/assets/sound/${filename}.mp3`);
      audio.loop = false;
      audio.autoplay = false;
      audio.preload = "metadata";

      audioRef.current = audio;

      fetch(`/assets/transcripts/${filename}.json`).then((response) => {
        response.json().then((data: { results: TranscriptFile }) => {
          const words = data.results
            .flatMap((result) => result.alternatives[0].words)
            .map(({ word, startOffset, endOffset }) => ({
              word,
              startOffset: Number(startOffset.slice(0, -1)),
              endOffset: Number(endOffset.slice(0, -1)),
            }));
          wordsRef.current = words;
        });
      });
    }
  }, [filename]);

  useEffect(() => {
    function onTimeUpdate() {
      const currentTime = audioRef.current.currentTime;
      const currentWord = wordsRef.current.find(
        ({ startOffset, endOffset }) =>
          currentTime >= startOffset && currentTime <= endOffset,
      );
      if (currentWord && currentWord.word !== word) {
        setWord(currentWord.word);
      }
    }

    audioRef.current.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audioRef.current.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [word]);

  const [visited, setVisited] = useState(false);

  const isSelected = useSelect()[0] === meshRef.current;
  useEffect(() => {
    const audio = audioRef.current;
    if (isSelected) {
      audio.load();
      audio.play();
      setVisited(true);
    } else if (!audio.paused) {
      audio.pause();
      setWord("");
    }
  }, [isSelected]);

  console.log(word);

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
      <Billboard>
        <Text color="white" anchorX={"center"} position={[0, 1.6, 0]}>
          {filename}
        </Text>
        <AnimatePresence>
          <motion.group
            key={word}
            initial={{ x: 0, y: 0, z: 0, scale: 0, opacity: 0 }}
            animate={{ x: 1.5, y: 0.5, z: 3, scale: 1, opacity: 1 }}
            exit={{ x: 4, y: 2, z: -10, scale: 0, opacity: 0 }}
          >
            {isSelected && (
              <Text color="white" anchorX={"left"}>
                {word}
              </Text>
            )}
          </motion.group>
        </AnimatePresence>
        {!visited && (
          <motion.mesh
            rotation={[(Math.PI / 2) * 0.1, 0, 0]}
            initial={{ scale: 1.3 }}
            animate={{
              scale: 1,
              transition: {
                duration: 4 + Math.random() * 2,
                repeatDelay: Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            <ringGeometry args={[2, 2.1]} />
            <meshStandardMaterial
              color={"#fff"}
              roughness={0.2}
              metalness={0.1}
              side={DoubleSide}
            />
          </motion.mesh>
        )}
      </Billboard>
    </motion.mesh>
  );
}
