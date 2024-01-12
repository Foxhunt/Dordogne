/* eslint-disable jsx-a11y/alt-text */
import { Image } from "@react-three/drei";

type Image = {
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  url: string;
};

const images: Image[] = [
  // right
  { position: [1.2, 0, -10], rotation: [0, -0.1, 0], url: "" },
  // left
  { position: [-1.2, 0, -5], rotation: [0, 0.1, 0], url: "" },
];

export default function Images() {
  return images.map(({ position, rotation }, index) => (
    <Image
      key={index}
      position={position}
      rotation={rotation}
      scale={[2, 3]}
      zoom={1}
      url={"https://picsum.photos/300.webp"}
    />
  ));
}
