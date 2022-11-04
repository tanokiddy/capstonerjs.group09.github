import {
  BOOK_TICKET,
  GET_BANNER,
  GET_LIST_SEAT,
  GET_MOVIELIST,
  GET_MOVIETAB,
} from "./constants/constants";

export const initialState = {
  banner: [],
  movieList: [],
  movieTab: [],

  seat: [],
  booking: {
    danhSachVe: [],
  },
  holdingSeat: [],
  listTheatre: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_SEAT: {
      return { ...state, listTheatre: action.listTheatre };
    }
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
    case GET_BANNER: {
      return { ...state, banner: action.banner };
    }
    case GET_MOVIELIST: {
      return { ...state, movieList: action.movieList };
    }
    case GET_MOVIETAB: {
      return { ...state, movieTab: action.movieTab };
    }
    default:
      return { ...state };
  }
};
