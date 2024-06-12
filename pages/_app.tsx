import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

import { extend } from "@react-three/fiber";
import {
  AmbientLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  PositionalAudio,
  RingGeometry,
  SphereGeometry,
} from "three";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();

  useEffect(() => {
    let homeTimeout: NodeJS.Timeout;

    const backToHome = (event: any) => {
      clearTimeout(homeTimeout);
      console.log(event);
      homeTimeout = setTimeout(
        () => {
          if (router.asPath !== "/") {
            router.push("/");
            console.log("back to home");
          }
        },
        5 * 60 * 1000,
      );
    };

    router.events.on("routeChangeComplete", backToHome);
    window.addEventListener("mousemove", backToHome);

    return () => {
      clearTimeout(homeTimeout);
      window.removeEventListener("mousemove", backToHome);
      router.events.off("routeChangeComplete", backToHome);
    };
  }, [router]);

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
