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
    let uri = `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03`;
    return https.get(uri);
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
  userSearch: (keyWord) => {
    let uri = `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP03&tuKhoa=${keyWord}`;
    return https.get(uri);
  },
  addUser: (dataUser) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/ThemNguoiDung`,
      method: "POST",
      data: dataUser,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
  getUserProfile: () => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
  updateUserProfile: (inputValues) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "PUT",
      data: inputValues,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
  userEditinginAdmin: (values) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "POST",
      data: values,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
};
