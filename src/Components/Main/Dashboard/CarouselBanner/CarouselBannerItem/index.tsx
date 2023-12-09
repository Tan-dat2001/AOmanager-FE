import { Carousel } from "@mantine/carousel";
import Image from "next/image";

export function CarouselBannerItem({src}:{src:string}) {
  return (
    <Carousel.Slide>
      <Image
        src={src}
        alt="banner"
        width={500}
        height={150}
        priority
      />
    </Carousel.Slide>
  );
}
