import React, { useEffect } from "react";
import { localServ } from "../services/localService";

export default function SecureView({ children }) {
  useEffect(() => {
    let userLocal = localServ.user.getDataUser();
    if (!userLocal) {
      window.location.href = "/login";
    }
  }, []);

  return <div>{children}</div>;
}
