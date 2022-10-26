import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadingOffAction,
  loadingOnAction,
} from "../redux/actions/loadingAction";
import { localServ } from "../services/localService";

export default function SecureViewAdmin({ children }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingOnAction());
    let userLocal = localServ.user.getDataUser();
    if (userLocal.maLoaiNguoiDung.toUpperCase() !== "QUANTRI") {
      dispatch(loadingOffAction());
      navigate("/Error");
    } else {
      dispatch(loadingOffAction());
      return;
    }
  }, []);

  return <div>{children}</div>;
}
