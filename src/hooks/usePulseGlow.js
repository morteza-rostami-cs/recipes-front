// hooks/usePulseGlow.js
import { useEffect } from "react";
import { useAnimation } from "framer-motion";

export const usePulseGlow = (intensity = 1.2, duration = 1.8) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, intensity, 1],
      textShadow: [
        "0 0 8px rgba(0, 212, 161, 0)",
        "0 0 28px rgba(0, 212, 161, 0.9)",
        "0 0 8px rgba(0, 212, 161, 0)",
      ],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls, intensity, duration]);

  return { controls };
};
