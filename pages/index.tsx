import OpeningWords from "@/components/openingWords";
import { AnimatePresence, motion } from "framer-motion";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  const [showWords, setShowWords] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(Math.sqrt(window.screen.width ** 2 + window.screen.height ** 2));
  }, []);

  // enter fullscreen when clicked
  useEffect(() => {
    const elem = document.documentElement;
    if (!showWords) {
      elem?.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [showWords]);

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center p-24 ${roboto.className} overflow-hidden`}
      onClick={() => setShowWords((showWords) => !showWords)}
    >
      <AnimatePresence>
        {!showWords && (
          <motion.div
            key="circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 10 } }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 1 } }}
            style={{ height }}
            className={`absolute bg-black rounded-full aspect-square -z-50`}
          />
        )}
        {showWords && (
          <motion.div
            key="color"
            variants={{
              exit: {
                color: "#ffffff",
                transition: {
                  when: "beforeChildren",
                  duration: 3,
                },
              },
            }}
            animate={{ color: "#000000" }}
            exit={"exit"}
            className="absolute flex flex-col items-center justify-center"
          >
            <motion.div
              key="fade"
              variants={{
                exit: { opacity: 0, transition: { duration: 10 } },
              }}
              className="absolute flex flex-col items-center justify-center"
            >
              <OpeningWords />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
