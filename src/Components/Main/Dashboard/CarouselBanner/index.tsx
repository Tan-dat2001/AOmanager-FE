import { Carousel } from "@mantine/carousel";
import styles from "./index.module.css";
import { CarouselBannerItem } from "./CarouselBannerItem";

export function CarouselBanner() {
  return (
    <Carousel slideSize="sx" slideGap="xs" loop align="start" controlSize={20} className={styles.carousel}>
      <CarouselBannerItem src="https://aquatips.net/wp-content/uploads/2021/05/Be-thuy-sinh-phong-cach-Ha-Lan-1024x570.jpg" />
      <CarouselBannerItem src="https://bizweb.dktcdn.net/100/403/653/files/maxresdefault-4-31034e0e-dfae-4d5b-bb5d-ae9351c14a92.jpg?v=1600894098490"/>
      <CarouselBannerItem src="https://thuysinh4u.com/wp-content/uploads/2019/06/be-thuy-sinh-nuoc-ngot-cua-tac-gia-davad-zoltan.png"/>
      <CarouselBannerItem src="https://sgl.com.vn/wp-content/uploads/2021/05/be-ca-thuy-sinh-aquarium.jpg"/>
      <CarouselBannerItem src="https://aquatips.net/wp-content/uploads/2021/05/Be-thuy-sinh-phong-cach-Ha-Lan-1024x570.jpg" />
      <CarouselBannerItem src="https://bizweb.dktcdn.net/100/403/653/files/maxresdefault-4-31034e0e-dfae-4d5b-bb5d-ae9351c14a92.jpg?v=1600894098490"/>
      <CarouselBannerItem src="https://thuysinh4u.com/wp-content/uploads/2019/06/be-thuy-sinh-nuoc-ngot-cua-tac-gia-davad-zoltan.png"/>
      <CarouselBannerItem src="https://sgl.com.vn/wp-content/uploads/2021/05/be-ca-thuy-sinh-aquarium.jpg"/>
    </Carousel>
  );
}
