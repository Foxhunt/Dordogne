/* eslint-disable jsx-a11y/alt-text */
import { Billboard, Image, Text } from "@react-three/drei";

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
    text: "Sie besuchten einige der ersten von Menschen geschaffenen Abbildungen.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/2.jpg",
    text: "Sie erkundeten die Höhlen und lauschten den Geschichten ihrer Behüter.",
  },
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/3.jpg",
    text: "Sie hörten von der Entstehung und dem Ursprung der Abbildungen.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/4.jpg",
    text: "Sie betrachteten die Gemälde und versuchten sich in ihre Erschaffer hineinzuversetzen.",
  },
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/5.jpg",
    text: "Sie tauchten ein in die Welt der Abbildungen und ließen sich von ihnen inspirieren.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/6.jpg",
    text: "Sie selbst wurden zu Erschaffern.",
  },
  {
    rotation: [0, 0.7, 0],
    url: "/assets/image/7.jpg",
    text: "Sie arbeiteten an ihren eigenen Abbildungen.",
  },
  {
    rotation: [0, -0.7, 0],
    url: "/assets/image/8.jpg",
    text: "Sie stellten sich die Frage:",
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

export default function Images() {
  return images.map(
    ({ rotation, scale = [2.5, 4], url, text }, index, array) => {
      const distance = 12;

      const imagePositionX = 1;

      const textPositionX = 0.6;
      const textPositionY = 0.6;

      return (
        <Billboard key={index}>
          <Image
            position={
              array.length - 1 === index
                ? // last image
                  [0, 0, index * -distance]
                : [
                    index % 2 ? imagePositionX : -imagePositionX,
                    0,
                    index * -distance,
                  ]
            }
            rotation={rotation}
            scale={scale}
            zoom={1}
            url={`/_next/image?url=${url}&w=1080&q=90`}
          />
          <Text
            outlineColor="black"
            outlineWidth={0.1}
            fontSize={2}
            outlineOpacity={1}
            anchorX={
              array.length - 1 === index
                ? "center"
                : index % 2
                  ? "right"
                  : "left"
            }
            anchorY="middle"
            textAlign={
              array.length - 1 === index
                ? "center"
                : index % 2
                  ? "right"
                  : "left"
            }
            scale={0.1}
            position={
              array.length - 1 === index
                ? // last image
                  [0, 0, index * -distance + 5]
                : [
                    index % 2 ? textPositionX : -textPositionX,
                    index % 2 ? -textPositionY : textPositionY,
                    index * -distance,
                  ]
            }
            maxWidth={30}
          >
            {text}
          </Text>
        </Billboard>
      );
    },
  );
}
