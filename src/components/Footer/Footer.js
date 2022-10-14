import React from "react";
import ContactHome from "./ContactHome";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "#212121" }} className="py-3 text-white">
      <ContactHome />
      <Copyright />
    </div>
  );
}
