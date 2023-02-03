import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import "./swiper.css";
import CradProduct from "./CardProduct/CardProduct";
import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);

const CardSwipper = () => {
  const { tempProducts, isLoading } = useSelector((state) => state.products);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        autoplay={{ delay: 1000 }}
        className="mySwiper"
      >
        {isLoading && <div></div>}
        {tempProducts
          ? tempProducts?.map((el, key) => {
              return (
                <SwiperSlide>
                  <CradProduct
                    key={key}
                    id={el.id}
                    img={el.img}
                    name={el.name}
                    description={el.description}
                    rating={el.rating}
                    price={el.price}
                  />
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </>
  );
};

export default CardSwipper;
