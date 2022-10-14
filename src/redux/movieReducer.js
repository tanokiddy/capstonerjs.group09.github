import { BOOK_TICKET } from "./constants/constants";

export const initialState = {
  seat: {},
  booking: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOK_TICKET: {
      let cloneState = { ...state };
      cloneState = {
        seat: action.seat,
        booking: {
          maLichChieu: action.thongTinPhim.maLichChieu,
          danhSachVe: [
            {
              maGhe: action.seat.maGhe,
              giaVe: action.seat.giaVe,
            },
          ],
        },
      };
      state = cloneState;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
