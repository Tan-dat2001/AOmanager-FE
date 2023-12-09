import Image from "next/image";

type IconMenuProps = {
  iconName: string;
};

export function IconMenu({ iconName }: IconMenuProps) {
  return <Image src={iconName} alt="Icon" width={18} height={18} priority />;
}
