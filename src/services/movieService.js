import axios from "axios";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./configURL";
import { localServ } from "./localService";

export const movieServ = {
  getListMovie: () => {
    let uri = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03`;
    return https.get(uri);
  },
  getListMoviebyId: (id) => {
    let uri = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03&tenPhim=${id}`;
    return https.get(uri);
  },
  getScheduleMovieByTheatre: () => {
    let uri = `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03
    `;
    return https.get(uri);
  },
  getScheduleInfoByIdMovie: (id) => {
    let uri = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`;
    return https.get(uri);
  },
  getListTheatre: (id) => {
    let uri = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`;
    return https.get(uri);
  },
  getMovieBanner: () => {
    let uri = `/api/QuanLyPhim/LayDanhSachBanner`;
    return https.get(uri);
  },
  postBookingTicket: (bookingState) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyDatVe/DatVe`,
      data: bookingState,
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
  deleteMovie: (movieId) => {
    let uri = `/api/QuanLyPhim/XoaPhim?MaPhim=${movieId}`;
    return https.delete(uri);
  },
  uploadMovie: (formData) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyPhim/ThemPhimUploadHinh
      `,
      data: formData,
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  updateMovieUpload: (formData) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyPhim/CapNhatPhimUpload
      `,
      data: formData,
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
  getTheatreSystem: () => {
    let uri = `/api/QuanLyRap/LayThongTinHeThongRap`;
    return https.get(uri);
  },
  getTheatre: (theatre) => {
    let uri = `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theatre}`;
    return https.get(uri);
  },
  addShowtimes: (formData) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyDatVe/TaoLichChieu
      `,
      data: formData,
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
      },
    });
  },
};
