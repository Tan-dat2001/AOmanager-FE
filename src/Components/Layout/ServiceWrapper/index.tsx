import { Header } from "@/Components/App/Header";
import { AppShell } from "@mantine/core";
import Footer from "../Footer";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ServiceWrapper = ({ children }: Props) => {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
      <AppShell.Header withBorder={false}>
        <Header />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default ServiceWrapper;
