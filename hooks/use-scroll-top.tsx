import { useEffect, useState } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrooled, setScrooled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrooled(true);
      } else {
        setScrooled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrooled;
};
