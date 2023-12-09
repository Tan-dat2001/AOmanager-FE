import { ILayout, ILayoutProps } from "@/layouts";
import { Menu as MenuLayout } from "@/Components/Layout/Menu";
import ServiceWrapper from "@/Components/Layout/ServiceWrapper";

export const Menu: ILayout = ({ children }: ILayoutProps) => {
  return (
    <ServiceWrapper>
      <MenuLayout>{children}</MenuLayout>
    </ServiceWrapper>
  );
};
