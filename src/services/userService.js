import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "./configURL";

export const userServ = {
  userLogin: (valuesLogin) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data: valuesLogin,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  userRegister: (valuesRegister) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/DangKy`,
      method: "POST",
      data: valuesRegister,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
};
