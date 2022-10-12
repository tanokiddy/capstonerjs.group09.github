import { https } from "./configURL";

export const movieServ = {
  getListMovie: () => {
    let uri = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP04`;
    return https.get(uri);
  },
  getScheduleMovieByTheatre: () => {
    let uri = `/api/QuanLyRap/LayThongTinLichChieuHeThongRap
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
};
