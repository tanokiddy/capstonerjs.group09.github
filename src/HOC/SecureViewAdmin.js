import React, { useEffect } from "react";
import { localServ } from "../services/localService";

export default function SecureView({ children }) {
  useEffect(() => {
    let userLocal = localServ.user.getDataUser();
    if (userLocal?.maLoaiNguoiDung.toUpperCase() !== "QUANTRI") {
      window.location.href = "/Error403";
    }
  }, []);

  return <div>{children}</div>;
}
