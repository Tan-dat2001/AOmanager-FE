import { Center, Container } from "@mantine/core";

const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Center
      style={{
        background: "var(--mantine-color-gray-light)",
        minHeight: "100vh",
      }}
    >
      <Container w={480} size="xs" pb={16}>
        {children}
      </Container>
    </Center>
  );
};
export default AuthLayout;
