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
    <div className="w-full flex justify-center customborder relative p-5 my-10">
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
    <img
      src="/home/right-arrow.png"
      alt="Bitcoin Mining in Dubai"
      className={className}
      style={{
        ...style,
        // background: "#6FC6B8",
        // padding: "5px",
        width: "40px",
        height: "40px",
        marginRight: "20px",
        // borderRadius: "100%",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
      onClick={onClick}
    ></img>
  );
}

// Custom Previous Arrow
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src="/home/left-arrow.png"
      alt="Bitcoin Mining in Dubai"
      className={className}
      style={{
        ...style,
        // background: "#6FC6B8",
        // padding: "5px",
        width: "40px",
        height: "40px",
        // borderRadius: "100%",
        // display: "flex",
        marginLeft: "20px",
        zIndex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
      onClick={onClick}
    ></img>
  );
}
