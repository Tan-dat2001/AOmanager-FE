import useToggle from "@/hooks/useToggle";
import { forgotPassword } from "@/services/auth";
import { Anchor, Button, Center, Container, Group, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCallback, useState } from "react";
import { z } from "zod";
import { Loader } from "@/Components/Common/Loader";
import AuthLayout from "@/Components/Layout/AuthLayout";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordProf>({
    initialValues: {
      email: "",
    },
    validate: resolver,
  });
  const [send, toggle] = useToggle(false);
  const onSubmit = useCallback(
    async (data: ForgotPasswordProf) => {
      setIsLoading(true);
      try {
        const res = await forgotPassword(data);
        res ? toggle() : form.setErrors({ email: "Email does not exist" });
      } catch (e) {
        form.setErrors({ email: "Email does not exist" });
      }
      setIsLoading(false);
    },
    [form, toggle],
  );

  return (
    <AuthLayout>
      <Center>
        <Stack gap=".5rem" pb="1rem">
          <Center fz="1.4rem">Forgot your password?</Center>
          <div>Re-Password with AO Store.</div>
        </Stack>
      </Center>
      <Container size="xs" p={0} bg="white" style={{ borderRadius: "4px" }}>
        <Stack p="1rem">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Center bg="teal.1" h="3rem" style={{ borderRadius: "4px" }}>
                {!send
                  ? "Enter your Email and instructions will be sent to you!"
                  : "The password recovery link has been sent to your Email!"}
              </Center>
              {!send && (
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                  <TextInput label="Email" placeholder={"Enter email"} {...form.getInputProps("email")} />
                  <Group justify="flex-end" mt="xl">
                    <Button type="submit">Reset</Button>
                  </Group>
                </form>
              )}
            </>
          )}
        </Stack>
      </Container>
      <Center mt="1rem">
        Remember It ?&nbsp;
        <Anchor href="/login" underline="never">
          Sign In here
        </Anchor>
      </Center>
    </AuthLayout>
  );
};
export default ForgotPassword;

const schema = z.object({
  email: z.string().min(1, { message: "Please enter Email" }),
});
const resolver = zodResolver(schema);
export type ForgotPasswordProf = z.infer<typeof schema>;
