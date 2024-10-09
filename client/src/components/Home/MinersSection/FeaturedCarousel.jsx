import React from "react";
import Slider from "react-slick";
import useGetFeaturedProducts from "../../../hooks/userProducts/useGetFeaturedProducts";
import FeaturedCard from "./FeaturedCard";

export default function FeaturedCarousel() {
  const { loading, products } = useGetFeaturedProducts();
  console.log(products);

  const settings = {
    dots: true, // Show dots navigation
    infinite: true, // Infinite loop
    speed: 500, // Animation speed
    slidesToShow: 1, // Show 3 slides at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay interval (2 seconds)
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom previous arrow
  };
  return (
    <div className="w-full flex justify-center">
      <Slider {...settings} className="w-full ">
        {products.map((x) => (
          <FeaturedCard
            key={x._id}
            img={x.featuredImage}
            name={x.productName}
            desc={x.description}
            hash={x.hashRate}
            power={x.power}
            algorithm={x.algorithm}
          />
        ))}
      </Slider>
    </div>
  );
}
// Custom Next Arrow
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "#6FC6B8",
        padding: "5px",
        width: "30px",
        height: "30px",
        marginRight: "20px",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}

// Custom Previous Arrow
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "#6FC6B8",
        padding: "5px",
        width: "30px",
        height: "30px",
        borderRadius: "100%",
        display: "flex",
        marginLeft: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}
