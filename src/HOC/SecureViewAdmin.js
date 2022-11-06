import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localServ } from "../services/localService";

export default function SecureViewAdmin({ children }) {
  let navigate = useNavigate();
  useEffect(() => {
    let userLocal = localServ.user.getDataUser();
    if (userLocal?.maLoaiNguoiDung.toUpperCase() !== "QUANTRI") {
      navigate("/Error");
    } else {
      return;
    }
  }, []);

  return <div>{children}</div>;
}
