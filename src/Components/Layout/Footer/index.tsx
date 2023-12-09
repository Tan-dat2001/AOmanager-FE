import { Text, Stack, Card, Flex, Center } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
const Footer = () => {
  return (
    <Card shadow="md" bg="#f5f5f5" p={2} fz={10}>
      <Center>
        <Flex gap={50}>
          <Stack gap={2}>
            <Text fz={8}>CONTACT</Text>
            <Text fz={8}>Email: aostore@gmail.com</Text>
            <Text fz={8}>Phone: 0987385771</Text>
            <Text fz={8}>Address: 97 Man Thiện, Hiệp Phú, Thủ Đức</Text>
          </Stack>
          <Stack gap={2}>
            <Text fz={8}>FOLLOW US</Text>
            <Center>
              <IconBrandFacebook width={14} height={14} />
              Facebook
            </Center>
            <Center>
              <IconBrandInstagram width={14} height={14} />
              Instagram
            </Center>
          </Stack>
        </Flex>
      </Center>
    </Card>
  );
};
export default Footer;
