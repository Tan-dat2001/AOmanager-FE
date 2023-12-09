import { useRouter } from "next/router";
import styles from "./index.module.css";
import { menuList, menuListLogin } from "@/config/menuList";
import { useRecoilState } from "recoil";
import { menuTab } from "@/config/state";
import { MouseEvent, useEffect, useState } from "react";
import { Logo } from "@/Components/Common/Icons/Logo";
import { Search } from "./Search";
import { NavbarItem } from "./NavbarItem";

export function Navbar() {
  const router = useRouter();
  const [active, setActive] = useRecoilState(menuTab);
  const [menu, setMenu] = useState(menuListLogin);

  useEffect(() => {
    const path = router.pathname;
    setMenu(localStorage.getItem("userId") ? menuList : menuListLogin);

    const item = path === "/main" ? menuList[0] : menuList.find((el, i) => path.startsWith(el.address) && i !== 0);
    setActive(item?.id || 1);
  }, [router.pathname]);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, link: string) => {
    event.preventDefault();
    if (link === "/login") {
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    }
    router.push(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <Logo width={70} height={60} />

        <Search />
      </div>

      <div className={styles.container2}>
        {menu.map((e, i) => (
          <NavbarItem
            key={i}
            activeItem={active}
            item={e}
            onClick={(value) => handleLinkClick(value, e.link ?? e.address)}
          />
        ))}
      </div>
    </div>
  );
}
