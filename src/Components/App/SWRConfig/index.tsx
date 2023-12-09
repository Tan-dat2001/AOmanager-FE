import { ReactNode } from "react";
import { SWRConfig as SWR } from "swr";

type SWRConfigProps = {
  children: ReactNode;
};

export function SWRConfig({ children }: SWRConfigProps) {
  return (
    <SWR
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
      }}
    >
      {children}
    </SWR>
  );
}
