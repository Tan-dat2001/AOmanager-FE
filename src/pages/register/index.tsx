import AuthLayout from "@/Components/Layout/AuthLayout";
import useToggle from "@/hooks/useToggle";
import { register } from "@/services/auth";
import { Container, Center, Stack, TextInput, Group, Button, Anchor, PasswordInput, Radio } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useCallback } from "react";
import { z } from "zod";

const Register = () => {
  const [x, toggle] = useToggle(false);

  const form = useForm<RegisterProf>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      gender: "MALE",
      birthday: new Date(),
      address: "",
      phone: "",
    },
    validate: resolver,
  });
  const onSubmit = useCallback(
    async (value: RegisterProf) => {
      if (value.password !== value.confirmPassword) {
        form.setErrors({
          password: "Password and Confirm Password do not match.",
          confirmPassword: "Password and Confirm Password do not match.",
        });
        return;
      }
      try {
        const res = await register(value);
        res === true ? toggle() : form.setErrors({ email: res?.toString() });
      } catch (e) {
        form.setErrors({ name: "Email or Password is incorrect", password: "Email or Password is incorrect" });
      }
    },
    [form, toggle],
  );
  const handleGenderChange = (selectedGender: string) => {
    form.setValues({
      gender: selectedGender,
    });
  };

  return (
    <AuthLayout>
      <Center>
        <Stack gap="1rem" pb="1rem">
          <Center fz="1.4rem">Free Register</Center>
          <div>Get your free AO Store account now</div>
        </Stack>
      </Center>
      {!x ? (
        <Container size="xs" p={0} bg="white" style={{ borderRadius: "4px" }}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Stack p="2rem">
              <TextInput label="Email" placeholder={"Enter Email"} {...form.getInputProps("email")} />
              <PasswordInput label="Password" placeholder={"Enter Password"} {...form.getInputProps("password")} />
              <PasswordInput
                label="Confirm Password"
                placeholder={"Enter Confirm Password"}
                {...form.getInputProps("confirmPassword")}
              />
              <TextInput label="FirstName" placeholder={"Enter FirstName"} {...form.getInputProps("firstName")} />
              <TextInput label="LastName" placeholder={"Enter LastName"} {...form.getInputProps("lastName")} />
              <DateInput
                valueFormat="DD/MM/YYYY"
                label="Birthday"
                placeholder="Birthday"
                {...form.getInputProps("birthday")}
              />
              <Radio.Group value={form.values.gender} name="gender" label="Gender" onChange={handleGenderChange}>
                <Group>
                  <Radio label="Male" value="MALE" checked={form.values.gender === "MALE"} />
                  <Radio label="Female" value="FEMALE" checked={form.values.gender === "FEMALE"} />
                </Group>
              </Radio.Group>
              <TextInput label="Address" placeholder={"Enter Address"} {...form.getInputProps("address")} />
              <TextInput label="Phone" placeholder={"Enter Phone"} {...form.getInputProps("phone")} />

              <Group justify="flex-start" mt="xl">
                <Button w="100%" type="submit">
                  Register
                </Button>
              </Group>
            </Stack>
          </form>
        </Container>
      ) : (
        <Center pb="2rem">
          <Anchor href="/login" underline="never">
            Register Successfully!!! Go to Login
          </Anchor>
        </Center>
      )}
      <Center mt="1rem">
        Already have an account ?&nbsp;
        <Anchor href="/login" underline="never">
          Login
        </Anchor>
      </Center>
    </AuthLayout>
  );
};
export default Register;

const phoneRegex = new RegExp(/^[0-9]{9,15}$/);
const schema = z.object({
  email: z.string().refine((value) => /\S+@\S+\.\S+/.test(value), { message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z.string().min(1, { message: "Please enter firstName" }),
  lastName: z.string().min(1, { message: "Please enter lastName" }),
  birthday: z.date(),
  gender: z.string().min(1, { message: "Please select a gender" }),
  address: z.string().min(1, { message: "Please enter address" }),
  phone: z.string().regex(phoneRegex, "Invalid Phone number!"),
});

const resolver = zodResolver(schema);
export type RegisterProf = z.infer<typeof schema>;
