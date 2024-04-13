/* eslint-disable jsx-a11y/alt-text */
import { Image } from "@react-three/drei";

type Image = {
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  url: string;
};

const images: Image[] = [
  // right
  {
    position: [1.2, 0, -10],
    rotation: [0, -0.1, 0],
    url: "/assets/image/DSC04806.jpg",
  },
  // left
  {
    position: [-1.2, 0, -5],
    rotation: [0, 0.1, 0],
    url: "/assets/image/DSC04806.jpg",
  },
];

export default function Images() {
  return images.map(({ position, rotation, url }, index) => (
    <Image
      key={index}
      position={position}
      rotation={rotation}
      scale={[2, 3]}
      zoom={1}
      url={`/_next/image?url=${url}&w=640&q=75`}
    />
  ));
}
