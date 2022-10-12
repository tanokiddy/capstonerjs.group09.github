import { https } from "./configURL";

export const userServ = {
  userLogin: (valuesLogin) => {
    let uri = `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap`;
    return https.post(uri, valuesLogin);
  },
};
