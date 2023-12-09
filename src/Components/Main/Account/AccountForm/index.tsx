import { Group, Radio, Text, TextInput, Textarea } from "@mantine/core";
import { AccountFormLayout } from "./AccountFormLayout";
import { DateInput } from "@mantine/dates";
import typo from "@/styles/text.module.css";
import { UserProps } from "@/types";
import { UseFormReturnType } from "@mantine/form";

type AccountFormProps = {
  form: UseFormReturnType<UserProps, (values: UserProps) => UserProps>;
  onChangeForm: (key: string, value: string | number | boolean | undefined) => void;
};

export function AccountForm({ form, onChangeForm }: AccountFormProps) {
  return (
    <div>
      <AccountFormLayout title="Last Name">
        <TextInput
          value={form.values.lastName}
          onChange={(event) => onChangeForm("lastName", event.currentTarget.value)}
        />
      </AccountFormLayout>
      <AccountFormLayout title="First Name">
        <TextInput
          value={form.values.firstName}
          onChange={(event) => onChangeForm("firstName", event.currentTarget.value)}
        />
      </AccountFormLayout>
      <AccountFormLayout title="Gender">
        <Radio.Group value={form.values.gender} onChange={(value) => onChangeForm("gender", value)}>
          <Group>
            <Radio value="MALE" label="Male" />
            <Radio value="FEMALE" label="Female" />
          </Group>
        </Radio.Group>
      </AccountFormLayout>
      <AccountFormLayout title="Date of birth">
        <DateInput
          value={new Date(form.values.birthday ?? "0")}
          valueFormat="DD/MM/YYYY"
          onChange={(value) => onChangeForm("birthday", value?.getTime())}
        />
      </AccountFormLayout>
      <AccountFormLayout title="Email">
        <Text className={typo.size_14_300}>{form.values.email}</Text>
      </AccountFormLayout>
      <AccountFormLayout title="Phone">
        <TextInput value={form.values.phone} onChange={(event) => onChangeForm("phone", event.currentTarget.value)} />
      </AccountFormLayout>
      <AccountFormLayout title="Address">
        <Textarea
          value={form.values.address}
          onChange={(event) => onChangeForm("address", event.currentTarget.value)}
          autosize
          minRows={4}
          maxRows={4}
        />
      </AccountFormLayout>
    </div>
  );
}
