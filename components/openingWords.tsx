import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

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

type OpeningWordsProps = {
  showWhy: boolean;
};

export default function OpeningWords({ showWhy }: OpeningWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex(Math.floor(Math.random() * images.length)),
      1500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={images[index]}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0, color: showWhy ? "white" : "black" }}
        exit={{ opacity: 0, y: -35 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
        className={`absolute flex flex-row`}
      >
        <AnimatePresence initial={false}>
          {showWhy && (
            <motion.div
              key={"why"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            >
              {why[index]}
            </motion.div>
          )}
          <motion.div layout className="px-1">
            {images[index]}
          </motion.div>
          {showWhy && (
            <motion.div
              key={"?"}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            >
              ?
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
