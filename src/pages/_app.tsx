import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@/styles/globals.css";
import { Notifications } from "@/Components/App/Notifications";
import { MantineProvider } from "@/Components/App/MantineProvider";
import { SWRConfig } from "@/Components/App/SWRConfig";
import { RecoilRoot } from "recoil";
import { Blank, Menu, type ILayout } from "@/layouts";
import React from "react";
import { NextRouter, useRouter } from "next/router";

type ComponentType = React.ComponentType & {
  layout?: string;
};

const layouts: Record<string, ILayout> = {
  Blank,
  Menu,
};

type AppProps = {
  Component: ComponentType;
  pageProps: Record<string, unknown>;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = getLayout(router, Component);

  return (
    <SWRConfig>
      <RecoilRoot>
        <MantineProvider>
          <Notifications />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </RecoilRoot>
    </SWRConfig>
  );
}

function getLayout(router: NextRouter, Component: ComponentType): ILayout {
  const layout = Component.layout ?? "Blank";
  return layouts[layout] || Blank;
}
