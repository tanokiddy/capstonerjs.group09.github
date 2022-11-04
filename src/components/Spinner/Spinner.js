import React from "react";
import loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { https } from "../../services/configURL";

export default function Spinner() {
  //   let isLoading = useSelector((state) => state.spinnerReducer.isLoading);
  //   return isLoading ? (
  //     <div className="w-screen h-screen fixed left-0 top-0  bg-black flex justify-center items-center z-40">
  //       <Lottie animationData={loading} />
  //     </div>
  //   ) : (
  //     <></>
  //   );
  // }
  return (
    <div
      id="spinner"
      className="w-screen h-screen fixed left-0 top-0  bg-black flex justify-center items-center z-40"
    >
      <Lottie animationData={loading} />
    </div>
  );
}
