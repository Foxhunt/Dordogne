import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Story() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dots");
    }, 1000);
  }, [router]);

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen bg-black text-white`}
    >
      Story!
    </main>
  );
}
