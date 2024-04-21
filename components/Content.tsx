/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";

import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Text } from "@react-three/drei";

import Image from "./Image";

type Image = {
  position?: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  scale?: [x: number, y: number];
  url: string;
  text?: string;
};

const text = `
Auf der Suche nach Antworten auf die Frage warum sich Menschen Bilder machen begaben sich x Studierende der Hochschule Düsseldorf auf einer Reise in die dordogne.

Dort liegen seit jahrtausenden einige der ersten von Menschen geschaffenen Abbildungen verborgen. 

Vor Ort berichteten die Behüter dieser zumal heilig wirkenden Städten von ihrem Wissen und ihren Vermutungen. Sie sprachen über den Ursprung und der Entstehung dieser Abbildungen und was ihre Erschaffer dazu bewegt haben könnte und was sie damit ausdrücken wollten. 

Dort besuchten sie höhlen um einige der ersten Abbildungen zu betrachten die von Menschen geschaffen wurden. 

Die Besuche und die Führungen durch die durch die Höhlen wirkte fast wie ein Rundgang durch eine Ausstellung. Die wandmalereien wirkten wie Gemälde die mit höchster Präzision geschaffen und mit einem geschulten Blick für das große ganze in den Gallerien platziert wurden. 

Mit mit funkelnden Augen berichteten die turguides von Historie der Stätten die sie zu erhalten versuchen. Jeder auf seine eigene Art und Weise mit verschiedenen schwerpunkten auf die Region die verwendeten Techniken und die Abbildung. Die Guides berichteten mit einer unvergleichlichen Faszination wie die Gemälde erschaffen wurden was auf den Gemälden abgebildet war unter welchen Umständen die Gemälde entstanden sein müssen was die Erschaffer vielleicht bei der Erschaffung des Gemäldes gedacht haben oder gefühlt haben. Aber immer mit dem Wissen dass es nur eine Interpretation des Gemäldes sein kann und nicht die Wahrheit denn diese kann nur durch den Erschaffer der Arbeit selbst ausgesprochen und vermittelt werden alles was wir nur noch tun können ist die Gemälde betrachten und in uns hineinhorchen und schauen was für Gefühle und Eindrücke sie bei uns auslösen.
`;

const images: Image[] = [
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/1.jpg",
    text: "Auf ihrer Reise besuchten Sie einige der ersten von Menschen geschaffenen Abbildungen.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/2.jpg",
    text: "Sie erkundeten Höhlen und lauschten den Geschichten ihrer Hüter und Hüterinnen.",
  },
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/3.jpg",
    text: "Sie hörten von den Legenden um die Entstehung und dem Ursprung der Abbildungen.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/4.jpg",
    text: "Sie betrachteten die Werke und versetzten sich in die Lage ihre Schöpfer und Schöpferinnen.",
  },
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/5.jpg",
    text: "Sie tauchten in die Welt der Abbildungen ein und ließen sich von ihnen inspirieren.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/7.jpg",
    text: "Sie arbeiteten an ihren eigenen Abbildungen.",
  },
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/6.jpg",
    text: "Und wurden selbst zu Erschaffenden.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/8.jpg",
    text: "Dabei stellten sie sich die Frage:",
  },
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/9.jpg",
    text: "Warum machen sich Menschen Bilder?",
  },
  {
    rotation: [0, 0, 0],
    scale: [8, 4.5],
    url: "/assets/image/10.jpg",
    text: "Dies sind ihre Antworten.",
  },
];

interface ImagesProps {
  zPosition: MotionValue<number>;
}

export default function Images({ zPosition }: ImagesProps) {
  const visibilityValue1 = useTransform(zPosition, [24, 20], [1, 0]);

  const [visibility1, setVisibility1] = useState(visibilityValue1.get());

  useMotionValueEvent(visibilityValue1, "change", (latestValue) => {
    setVisibility1(latestValue);
    console.log("Front Text 1 visibility", latestValue);
  });

  const visibilityValue2 = useTransform(
    zPosition,
    [23, 21.5, 20, 15],
    [0, 1, 1, 0],
  );

  const [visibility2, setVisibility2] = useState(visibilityValue2.get());

  useMotionValueEvent(visibilityValue2, "change", (latestValue) => {
    setVisibility2(latestValue);
    console.log("Front Text 2 visibility", latestValue);
  });

  return (
    <>
      {images.map(({ rotation, scale, url, text }, index, array) => (
        <Image
          key={index}
          zPosition={zPosition}
          rotation={rotation}
          scale={scale}
          url={url}
          text={text}
          index={index}
          isLast={array.length - 1 === index}
        />
      ))}
      <Text
        outlineColor="black"
        outlineWidth={0.07}
        outlineOpacity={visibility1}
        fillOpacity={visibility1}
        anchorX="center"
        anchorY="middle"
        textAlign="justify"
        scale={0.1}
        position={[0, -0.1 - 1 * (1 - visibility1), 20]}
        maxWidth={20}
      >
        Warum sich Menschen Bilder machen?
      </Text>
      <Text
        outlineColor="black"
        outlineWidth={0.07}
        outlineOpacity={visibility2}
        fillOpacity={visibility2}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        scale={0.1}
        position={[0, 0 + 1 * (1 - visibility2), 16]}
        maxWidth={15}
      >
        Diese Frage stellten sich 26 Studierende der Hochschule Düsseldorf.
      </Text>
    </>
  );
}
