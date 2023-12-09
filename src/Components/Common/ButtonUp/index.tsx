import { useEffect, useState } from "react";
import { IconUp } from "@/Components/Common/Icons/IconUp";
import styles from "./index.module.css";

export function ButtonUp() {
  const [isShowButton, setIsShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsShowButton(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isShowButton && (
        <div className={styles.container} onClick={handleScrollToTop}>
          <IconUp />
        </div>
      )}
    </>
  );
}
