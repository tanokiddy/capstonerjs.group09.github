import axios from "axios";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./configURL";
import { localServ } from "../services/localService";
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
  userList: () => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  userDelete: (taiKhoan) => {
    let uri = `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;
    return https.delete(uri);
  },
  userTicket: () => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
};
