import { AnimatePresence, motion } from "framer-motion";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

const images = [
  "Bilder", // German
  "pictures", // English
  "images", // French
  "immagini", // Italian
  "imágenes", // Spanish
  "imagens", // Portuguese
  "beeldjes", // Dutch
  "bilder", // Swedish
  "kuvia", // Finnish
  "obrazy", // Polish
  "resimler", // Turkish
  "εικόνες", // Greek
  "изображения", // Russian
  "صور", // Arabic
  "תמונות", // Hebrew
  "तस्वीरें", // Hindi
  "图片", // Chinese
  "画像", // Japanese
  "사진", // Korean
  "hình ảnh", // Vietnamese
  "gambar", // Indonesian
  "ภาพ", // Thai
  "fotografije", // Croatian
  "fotky", // Czech
  "billeder", // Danish
  "pildid", // Estonian
  "képek", // Hungarian
  "attēli", // Latvian
  "nuotraukos", // Lithuanian
  "bilder", // Norwegian
];

const why = [
  "Wieso", // German
  "Why", // English
  "Pourquoi", // French
  "Perché", // Italian
  "¿Por qué", // Spanish
  "Por que", // Portuguese
  "Waarom", // Dutch
  "Varför", // Swedish
  "Miksi", // Finnish
  "Dlaczego", // Polish
  "Neden", // Turkish
  "Γιατί", // Greek
  "Почему", // Russian
  "لماذا", // Arabic
  "לָמָּה", // Hebrew
  "क्यों", // Hindi
  "为什么", // Chinese
  "なぜ", // Japanese
  "왜", // Korean
  "Tại sao", // Vietnamese
  "Mengapa", // Indonesian
  "ทำไม", // Thai
  "Zašto", // Croatian
  "Proč", // Czech
  "Hvorfor", // Danish
  "Miks", // Estonian
  "Miért", // Hungarian
  "Kāpēc", // Latvian
  "Kodėl", // Lithuanian
  "Hvorfor", // Norwegian
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [showWhy, setShowWhy] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex(Math.floor(Math.random() * images.length)),
      800,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${roboto.className}`}
      onClick={() => setShowWhy(!showWhy)}
    >
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -35 }}
          transition={{ type: "spring", duration: .6, bounce: .2 }}
          className="absolute flex flex-row"
        >
          {showWhy && (
            <motion.div
              key={"why"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", duration: .6, bounce: .2 }}
              className="pr-1"
            >
              {why[index]}
            </motion.div>
          )}
          {images[index]}
          {showWhy && (
            <motion.div
              key={"?"}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", duration: .6, bounce: .2 }}
              className="pl-1"
            >
              ?
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
