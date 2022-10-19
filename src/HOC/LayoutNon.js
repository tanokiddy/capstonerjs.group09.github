import React from "react";
import HeaderNon from "../components/Header/HeaderNon";
export default function LayoutNon({ Component }) {
  return (
    <div>
      <HeaderNon />
      <Component />
    </div>
  );
}
