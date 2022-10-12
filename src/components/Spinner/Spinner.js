import React from "react";
import loading from "../../assets/loading.json";
import Lottie from "lottie-react";

export default function Spinner() {
  return (
    <div className="w-screen h-screen fixed left-0 top-0  bg-black flex justify-center items-center">
      <Lottie animationData={loading} />
    </div>
  );
}
