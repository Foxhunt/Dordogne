/* eslint-disable jsx-a11y/alt-text */
import { Image as DreiImage, Text } from "@react-three/drei";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useState } from "react";

interface ImageProps {
  rotation: [number, number, number];
  scale?: [number, number];
  url: string;
  text?: string;
  isLast: boolean;
  index: number;
  zPosition: MotionValue<number>;
}

export default function Image({
  rotation,
  scale = [2.5, 4],
  url,
  text,
  isLast,
  index,
  zPosition,
}: ImageProps) {
  const distance = 12;

  const imagePositionX = 1;
  const imagePositionZ = index * -distance;

  const textPositionX = 0.6;
  const textPositionY = 0.6;

  const visibilityValue = useTransform(
    zPosition,
    [
      imagePositionZ + 20,
      imagePositionZ + 15,
      imagePositionZ + 8,
      imagePositionZ + 3,
    ],
    [0, 1, 1, 0],
  );

  const [visibility, setVisibility] = useState(visibilityValue.get());

  useMotionValueEvent(visibilityValue, "change", (latestValue) => {
    setVisibility(latestValue);
    console.log("Image + Text visibility", index, latestValue);
  });

  return (
    (visibility !== 0 || isLast) && (
      <motion.group>
        <DreiImage
          position={
            isLast
              ? // last image
                [0, 0, index * -distance]
              : [
                  index % 2
                    ? imagePositionX + 1 * (1 - visibility)
                    : -imagePositionX - 1 * (1 - visibility),
                  0,
                  index * -distance,
                ]
          }
          rotation={[
            rotation[0],
            isLast
              ? rotation[1]
              : index % 2
                ? rotation[1] - 1 * (1 - visibility)
                : rotation[1] + 1 * (1 - visibility),
            rotation[2],
          ]}
          transparent
          opacity={isLast ? 1 : visibility}
          scale={scale}
          zoom={1}
          url={`/_next/image?url=${url}&w=1080&q=90`}
        />
        <Text
          fontSize={3}
          outlineColor="black"
          outlineWidth={0.2}
          outlineOpacity={isLast ? 1 : visibility}
          fillOpacity={isLast ? 1 : visibility}
          anchorX={isLast ? "center" : index % 2 ? "right" : "left"}
          anchorY="middle"
          textAlign={isLast ? "center" : index % 2 ? "right" : "left"}
          scale={0.1}
          position={
            isLast
              ? // last image
                [0, 0, index * -distance + 5]
              : [
                  index % 2
                    ? textPositionX - 1 * (1 - visibility)
                    : -textPositionX + 1 * (1 - visibility),
                  index % 2 ? -textPositionY : textPositionY,
                  index * -distance,
                ]
          }
          rotation={[
            0,
            isLast
              ? 0
              : index % 2
                ? 1 * (1 - visibility)
                : -1 * (1 - visibility),
            0,
          ]}
          maxWidth={25}
        >
          {text}
        </Text>
      </motion.group>
    )
  );
}
