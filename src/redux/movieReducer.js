import { BOOK_TICKET } from "./constants/constants";

export const initialState = {
  seat: [],
  booking: {
    danhSachVe: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOK_TICKET: {
      let cloneState = { ...state };
      let index = cloneState.seat.findIndex((item) => {
        return item.maGhe === action.seat.maGhe;
      });
      if (index === -1) {
        cloneState.seat.push(action.seat);
      } else {
        cloneState.seat.splice(index, 1);
      }
      cloneState.booking = {
        ...cloneState.booking,
        maLichChieu: action.thongTinPhim.maLichChieu,
      };
      let index1 = cloneState.booking.danhSachVe.findIndex((item) => {
        return item.maGhe === action.seat.maGhe;
      });
      if (index1 === -1) {
        cloneState.booking.danhSachVe.push({
          maGhe: action.seat.maGhe,
          giaVe: action.seat.giaVe,
        });
      } else {
        cloneState.booking.danhSachVe.splice(index1, 1);
      }
      state = cloneState;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
