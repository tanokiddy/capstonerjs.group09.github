import { Carousel } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { TOKEN_CYBERSOFT } from "../../services/configURL";

export default function CarouselHome() {
  const [carousel, setCarousel] = useState([]);
  useEffect(() => {
    axios({
      baseURL: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    })
      .then((res) => {
        console.log(res);
        setCarousel(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderCarousel = () => {
    return carousel.map((carousel, index) => {
      return (
        <div className="w-full h-full">
          <img
            key={index}
            className="object-cover w-full h-full overflow-hidden"
            src={carousel.hinhAnh}
            alt=""
          />
        </div>
      );
    });
  };
  return (
    <div className="my-5 container">
      <Carousel dotPosition="left" autoplay>
        {renderCarousel()}
      </Carousel>
    </div>
  );
}
