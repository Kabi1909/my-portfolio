import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Fine-pointer motion is opt-in; changes to accessibility settings apply live.
export default function usePointerMotion() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const query = matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 851px)",
    );
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return fine && !reduced;
}
