import OpeningWords from "@/components/openingWords";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const timeToStory = 5;

export default function Home() {
  const router = useRouter();

  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(Math.sqrt(window.screen.width ** 2 + window.screen.height ** 2));
  }, []);

  const [showWords, setShowWords] = useState(true);
  // enter fullscreen when clicked
  useEffect(() => {
    async function lock() {
      navigator.wakeLock.request("screen");
    }
    const elem = document.documentElement;
    if (!showWords) {
      elem?.requestFullscreen?.();
      elem?.webkitRequestFullscreen?.();
      elem?.webkitRequestFullScreen?.();
      elem?.mozRequestFullScreen?.();
      elem?.msRequestFullscreen?.();

      if ("wakeLock" in navigator) {
        lock();
      }
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.();
      document.webkitExitFullscreen?.();
      document.webkitExitFullScreen?.();
      document.mozCancelFullScreen?.();
      document.msExitFullscreen?.();
    }
  }, [showWords]);

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden`}
      onClick={() => {
        setShowWords(false);
        router.prefetch("/story");
      }}
    >
      <AnimatePresence>
        {!showWords && (
          <motion.div
            key="circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: timeToStory },
            }}
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
                  staggerChildren: 3,
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
                exit: { opacity: 0, transition: { duration: timeToStory } },
              }}
              onAnimationComplete={(definition) => {
                if (definition === "exit") {
                  router.push("/story");
                }
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
