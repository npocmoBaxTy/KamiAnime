import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FC, ReactNode } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import "./Carousel.css";

interface ICarousel {
  slidesCount?: number;
  children: ReactNode;
  mobileSlides?: number;
  slidesToScroll?: number;
}

// Кастомная кнопка "Next"
const NextArrow: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className="custom--button-carousel custom--button-next inline-block text-primary bg-gray -right-5 z-50 cursor-pointer"
      onClick={onClick}
    >
      <FaAngleLeft className="rotate-180" />
    </div>
  );
};

// Кастомная кнопка "Prev"
const PrevArrow: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className="custom--button-carousel custom--button-prev text-primary bg-gray -left-5 z-50 cursor-pointer"
      onClick={onClick}
    >
      <FaAngleLeft />
    </div>
  );
};

const Carousel: FC<ICarousel> = ({
  slidesCount,
  children,
  mobileSlides,
  slidesToScroll,
}) => {
  var settings = {
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: "linear",
    pauseOnHover: true,
    slidesToShow: slidesCount || 1,
    slidesToScroll: slidesToScroll ? slidesToScroll : 1,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: slidesCount || 3,
          slidesToScroll: slidesToScroll ? slidesToScroll : 1,
          centerMode: true,
          centerPadding: "60px",
          arrows: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesCount || 3,
          slidesToScroll: slidesToScroll ? slidesToScroll : 1,
          centerMode: true,
          centerPadding: "60px",
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "60px",
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: mobileSlides ? mobileSlides : 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="custom--carousel">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Carousel;
