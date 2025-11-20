// hooks/useTypewriter.js
import { useState, useEffect } from "react";

export const useTypewriter = (
  text,
  typeSpeed = 1800,
  deleteSpeed = 1200,
  pauseTime = 700
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    const handleTyping = () => {
      const fullText = text;

      if (!isDeleting && displayedText.length < fullText.length) {
        // Typing
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        timer = setTimeout(handleTyping, typeSpeed);
      } else if (isDeleting && displayedText.length > 0) {
        // Deleting
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        timer = setTimeout(handleTyping, deleteSpeed);
      } else if (!isDeleting && displayedText === fullText) {
        // Pause before delete
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText === "") {
        // Restart loop
        setIsDeleting(false);
        timer = setTimeout(handleTyping, 300); // small delay before retype
      }
    };

    // Start typing
    timer = setTimeout(handleTyping, 200);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, typeSpeed, deleteSpeed, pauseTime]);

  return {
    displayedText,
    isTyping: displayedText.length < text.length && !isDeleting,
  };
};
