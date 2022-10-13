import { https } from "./configURL";

export const userServ = {
  userLogin: (valuesLogin) => {
    let uri = `/api/QuanLyNguoiDung/DangNhap`;
    return https.post(uri, valuesLogin);
  },
  userRegister: (valuesRegister) => {
    let uri = `/api/QuanLyNguoiDung/DangKy`;
    return https.post(uri, valuesRegister);
  },
};
