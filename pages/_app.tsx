import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

import { extend } from "@react-three/fiber";
import {
  AmbientLight,
  PointLight,
  Group,
  Mesh,
  SphereGeometry,
  PlaneGeometry,
  PositionalAudio,
  MeshStandardMaterial,
  RingGeometry,
} from "three";

extend({
  AmbientLight,
  PointLight,
  Group,
  Mesh,
  SphereGeometry,
  PlaneGeometry,
  PositionalAudio,
  MeshStandardMaterial,
  RingGeometry,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
