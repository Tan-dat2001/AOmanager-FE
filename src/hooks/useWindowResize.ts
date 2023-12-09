import { useEffect, useState } from "react";
import throttle from "lodash.throttle";

export const useWindowResize = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 500);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};
