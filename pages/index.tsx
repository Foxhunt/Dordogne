import OpeningWords from "@/components/openingWords";
import { AnimatePresence, motion } from "framer-motion";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(Math.sqrt(window.screen.width ** 2 + window.screen.height ** 2));
  }, []);

  // enter fullscreen when clicked
  useEffect(() => {
    const elem = document.documentElement;
    if (clicked) {
      elem?.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [clicked]);

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center p-24 ${roboto.className} overflow-hidden`}
      onClick={() => setClicked((clicked) => !clicked)}
    >
      <AnimatePresence>
        {clicked && (
          <motion.div
            key={"circle"}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 3 }}
            style={{ height }}
            className={`absolute bg-black rounded-full aspect-square`}
          />
        )}
        <OpeningWords showWhy={clicked} />
      </AnimatePresence>
    </main>
  );
}
