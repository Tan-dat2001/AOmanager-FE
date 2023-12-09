import { ReactNode } from "react";
import { MantineProvider as Provider } from "@mantine/core";

type MantineProviderProps = {
  children: ReactNode;
};

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <Provider
      theme={{
        colors: {
          brand: [
            "#fafbef",
            "#f4f5df",
            "#e8e8b9",
            "#dbdd90",
            "#d2d26d",
            "#cbcc57",
            "#c7c94b",
            "#b0b23c",
            "#9b9e33",
            "#858826",
          ],
        },
        primaryColor: "brand",
      }}
    >
      {children}
    </Provider>
  );
}
